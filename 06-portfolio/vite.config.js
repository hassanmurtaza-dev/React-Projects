import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function contactApi(env) {
  return {
    name: "contact-api",
    configureServer(server) {
      server.middlewares.use("/api/contact", async (req, res, next) => {
        if (req.method !== "POST") return next();

        Object.assign(process.env, env);

        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (data) => {
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify(data));
          return res;
        };

        try {
          const module = await server.ssrLoadModule("/api/contact.js");
          await module.default(req, res);
        } catch (error) {
          server.config.logger.error(`contact api: ${error.message}`);
          res.status(500).json({ error: "The contact form is not configured yet." });
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), contactApi(env)],
  };
});
