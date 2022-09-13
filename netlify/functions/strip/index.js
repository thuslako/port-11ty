const { EleventyServerless } = require("@11ty/eleventy");

require("./eleventy-bundler-modules.js");

async function handler (event) {
	let elev = new EleventyServerless("strip", event.path, {
		inputDir: "src",
		functionsDir: "netlify/functions/",
	});

  try {
		return {
			statusCode: 200,
			headers: {
				"Content-Type": "text/html; charset=UTF-8"
			},
			body: await elev.render()
		};
	} catch (error) {
		// Only console log for matching serverless paths
		// (otherwise you’ll see a bunch of BrowserSync 404s for non-dynamic URLs during --serve)
		if(elev.isServerlessUrl(event.path)) {
			console.log("Dynamic render error:", error);
		}

		return {
			statusCode: error.httpStatusCode || 500,
			body: JSON.stringify({
				error: error.message
			}, null, 2)
		};
	}
}

const { builder } = require("@netlify/functions");
exports.handler = builder(handler);
