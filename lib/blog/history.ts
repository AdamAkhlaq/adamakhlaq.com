import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { cacheLife } from "next/cache";
import { repo } from "@/lib/site";

const run = promisify(execFile);

export type Change = { sha: string; date: string; message: string };

/**
 * The commits that touched a post, newest first, for its public changelog.
 * Local builds read git directly. Vercel clones only the last few commits, so
 * there the history comes from the GitHub API instead. Returns null if neither
 * is available, and the page falls back to a link to the file's history.
 */
export async function getPostHistory(file: string): Promise<Change[] | null> {
	"use cache";
	cacheLife("max");

	try {
		if (await hasFullHistory()) return await fromGit(file);
	} catch {
		// No usable git checkout; try GitHub.
	}

	try {
		return await fromGitHub(file);
	} catch (error) {
		console.warn(`Could not load the history of ${file}:`, error);
		return null;
	}
}

async function hasFullHistory() {
	const { stdout } = await run("git", ["rev-parse", "--is-shallow-repository"]);
	return stdout.trim() === "false";
}

async function fromGit(file: string): Promise<Change[]> {
	const { stdout } = await run("git", [
		"log",
		"--follow",
		"--no-merges",
		"--format=%h%x1f%cs%x1f%s",
		"--",
		file,
	]);
	return stdout
		.split("\n")
		.filter(Boolean)
		.map((line) => {
			const [sha, date, subject] = line.split("\x1f");
			return { sha, date, message: readable(subject) };
		});
}

type GitHubCommit = {
	sha: string;
	parents: unknown[];
	commit: { message: string; committer: { date: string } };
};

async function fromGitHub(file: string): Promise<Change[]> {
	const params = new URLSearchParams({
		path: file,
		sha: process.env.VERCEL_GIT_COMMIT_SHA || repo.branch,
		per_page: "100",
	});
	const token = process.env.GITHUB_TOKEN;
	const res = await fetch(
		`https://api.github.com/repos/${repo.owner}/${repo.name}/commits?${params}`,
		{
			headers: {
				Accept: "application/vnd.github+json",
				...(token && { Authorization: `Bearer ${token}` }),
			},
		},
	);
	if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
	const commits: GitHubCommit[] = await res.json();
	return commits
		.filter((c) => c.parents.length < 2)
		.map((c) => ({
			sha: c.sha.slice(0, 7),
			date: c.commit.committer.date.slice(0, 10),
			message: readable(c.commit.message.split("\n")[0]),
		}));
}

/** "feat(blog): add a Never list" reads as "Add a Never list". */
function readable(subject: string) {
	const message = subject.replace(/^\w+(\([^)]*\))?!?:\s*/, "");
	return message.charAt(0).toUpperCase() + message.slice(1);
}
