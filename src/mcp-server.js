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

// TODO(human)
// Implement the core MCP server initialization and Git integration
// This should include:
// 1. Create McpServer instance with proper name and capabilities
// 2. Set up simple-git instance for repository operations
// 3. Register at least one basic Git tool (e.g., git status)
// 4. Connect to StdioServerTransport and handle connections
// 5. Add proper error handling and logging

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
  
  // 5. Connect to Transport
  // StdioServerTransport enables communication via stdin/stdout (standard for CLI tools)
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.log('MCP server connected and ready for requests');
  console.log('Available tools: git-status, git-branch');
  console.log('Use stdin/stdout for MCP protocol communication');
}

// Start the server
main().catch((error) => {
  console.error('Server startup failed:', error);
  process.exit(1);
});