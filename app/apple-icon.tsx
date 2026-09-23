import { profileIcon } from "@/lib/profile-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS applies its own rounded mask, so the touch icon stays square.
export default function AppleIcon() {
	return profileIcon(size.width, { round: false });
}
