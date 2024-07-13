import { defineManifest } from "@crxjs/vite-plugin";
import packageData from "../package.json";

//@ts-ignore
const isDev = process.env.NODE_ENV == "development";
// const gcpAuthClientId = import.meta.env.VITE_GCP_AUTH_CLIENT_ID;
const gcpAuthClientId =
	"";

export default defineManifest({
	name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ""}`,
	description: packageData.description,
	version: packageData.version,
	manifest_version: 3,
	icons: {
		16: "logo/logo-16.png",
		32: "logo/logo-32.png",
		48: "logo/logo-48.png",
		192: "logo/logo-192.png",
		512: "logo/logo-512.png",
	},
	action: {
		default_popup: "popup.html",
		default_icon: "logo/logo-48.png",
	},
	options_page: "options.html",
	// devtools_page: 'devtools.html',
	background: {
		service_worker: "src/background/index.ts",
		type: "module",
	},
	content_scripts: [
		{
			matches: ["http://*/*", "https://*/*"],
			run_at: "document_end",
			js: ["src/contentScript/index.ts"],
		},
	],
	side_panel: {
		default_path: "sidepanel.html",
	},
	web_accessible_resources: [
		{
			resources: [
				"logo/logo-16.png",
				"logo/logo-32.png",
				"logo/logo-48.png",
				"logo/logo-192.png",
				"logo/logo-512.png",
			],
			matches: [],
		},
	],
	permissions: [
		"activeTab",
		"contextMenus",
		"notifications",
		"storage",
		"identity",
		"sidePanel",
	],
	host_permissions: [
		"https://www.googleapis.com/*",
		"https://fonts.googleapis.com/*",
	],
	oauth2: {
		client_id: gcpAuthClientId,
		scopes: [
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		],
	},
	// key: "-----BEGIN PUBLIC KEY-----\n<fill-me>\n-----END PUBLIC KEY-----",
	content_security_policy: {
		extension_pages:
			"script-src 'self'; object-src 'self'; script-src-elem 'self'",
	},
	// chrome_url_overrides: {
	//   newtab: 'newtab.html',
	// },
});
