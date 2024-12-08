const express = require("express");
const { exec, execFile } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/exec", async (req, res) => {
  const cmd = req.query.cmd;

  if (!cmd) {
    return res.status(400).send("No command provided.");
  }

  try {
    const response = await new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          return reject(`Error: ${error.message}`);
        } else if (stderr) {
          return resolve(`Stderr: ${stderr}`);
        }
        resolve(stdout);
      });
    });
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/execFile", async (req, res) => {
  const cmd = req.query.cmd;
  const args = req.query.args ? req.query.args.split(",") : [];

  if (!cmd) {
    return res.status(400).send("No command provided.");
  }

  try {
    const response = await new Promise((resolve, reject) => {
      if (process.platform === "win32") {
        // On Windows, use cmd.exe to run mkdir
        execFile(cmd, args, (error, stdout, stderr) => {
          if (error) {
            return reject(`Error: ${error.message}`);
          } else if (stderr) {
            return resolve(`Stderr: ${stderr}`);
          }
          resolve(stdout);
        });
      } else {
        // For Unix-like systems (Linux, macOS), execFile should work directly
        execFile(cmd, args, (error, stdout, stderr) => {
          if (error) {
            return reject(`Error: ${error.message}`);
          } else if (stderr) {
            return resolve(`Stderr: ${stderr}`);
          }
          resolve(stdout);
        });
      }
    });

    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(5000, () => console.log("Server is listening on port 5000"));
