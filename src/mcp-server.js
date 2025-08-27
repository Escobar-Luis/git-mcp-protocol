/**
 * Git + MCP Protocol Server
 * 
 * Main MCP server implementation for Git repository intelligence
 * Follows Model Context Protocol 2025-06-18 specification
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import simpleGit from "simple-git";

// MCP Server Implementation Complete ✅
// Features: Git status, branch operations, and commit history
// Learning Focus: Progressive Git command mastery through MCP development

async function main() {
  console.log('Git + MCP Protocol Server - Starting initialization');
  
  // 1. Create MCP Server Instance
  // This is the core MCP protocol handler - it manages all communication
  const server = new McpServer({
    name: "git-mcp-server", 
    version: "1.0.0"
  });
  
  // 2. Initialize Git Integration
  // simple-git provides async Git operations
  const git = simpleGit();
  
  // 3. Register Git Status Tool
  // Tools are the primary way MCP servers expose functionality to clients
  server.registerTool(
    "git-status",                     // Tool identifier (what clients call)
    {
      title: "Git Repository Status",  // Human-readable name for UIs
      description: "Get the current status of the Git repository",
      inputSchema: {}                 // No input needed for status
    },
    async () => {                     // The actual tool implementation
      try {
        const status = await git.status();
        return {
          content: [{
            type: "text",
            text: `Repository Status:\n${JSON.stringify(status, null, 2)}`
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text", 
            text: `Error getting Git status: ${error.message}`
          }],
          isError: true
        };
      }
    }
  );
  
  // 4. Register Git Branch Tool  
  // Shows how to create tools with input parameters
  server.registerTool(
    "git-branch",
    {
      title: "Git Branch Operations",
      description: "List all Git branches or get current branch info",
      inputSchema: {
        action: z.enum(["list", "current"]).describe("Branch operation to perform")
      }
    },
    async ({ action }) => {
      try {
        if (action === "list") {
          const branches = await git.branchLocal();
          return {
            content: [{
              type: "text",
              text: `Local Branches:\n${branches.all.join('\n')}\nCurrent: ${branches.current}`
            }]
          };
        } else if (action === "current") {
          const branch = await git.revparse(['--abbrev-ref', 'HEAD']);
          return {
            content: [{
              type: "text",
              text: `Current branch: ${branch}`
            }]
          };
        }
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error with Git branch operation: ${error.message}`
          }],
          isError: true
        };
      }
    }
  );
  
  // 6. Register Git Log Tool
  // Demonstrates more complex input validation and Git history operations
  server.registerTool(
    "git-log",
    {
      title: "Git Commit History",
      description: "Get recent commit history with customizable options",
      inputSchema: {
        type: "object",
        properties: {
          limit: {
            type: "number",
            description: "Number of commits to show (default: 10)",
            default: 10
          },
          format: {
            type: "string",
            enum: ["oneline", "full"],
            description: "Log format type",
            default: "oneline"
          }
        }
      }
    },
    async ({ limit = 10, format = "oneline" }) => {
      try {
        const logOptions = {
          maxCount: limit,
          format: format === "oneline" ? { hash: "%h", message: "%s" } : undefined
        };
        
        const log = await git.log(logOptions);
        
        if (format === "oneline") {
          const commits = log.all.map(commit => 
            `${commit.hash} ${commit.message}`
          ).join('\n');
          
          return {
            content: [{
              type: "text",
              text: `Recent Commits (${limit}):\n${commits}`
            }]
          };
        } else {
          return {
            content: [{
              type: "text",
              text: `Commit History:\n${JSON.stringify(log.all, null, 2)}`
            }]
          };
        }
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error getting Git log: ${error.message}`
          }],
          isError: true
        };
      }
    }
  );
  
  // 7. Connect to Transport
  // StdioServerTransport enables communication via stdin/stdout (standard for CLI tools)
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.log('MCP server connected and ready for requests');
  console.log('Available tools: git-status, git-branch, git-log');
  console.log('Use stdin/stdout for MCP protocol communication');
}

// Start the server
main().catch((error) => {
  console.error('Server startup failed:', error);
  process.exit(1);
});