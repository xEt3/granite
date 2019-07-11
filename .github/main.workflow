workflow "ZH Automation - PR Manage" {
  resolves = ["call_zh_automations"]
  on = "pull_request"
}

action "call_zh_automations" {
  uses = "james1x0/zenhub-automations@zh-gh-experimentation"
  secrets = [
    "GITHUB_TOKEN",
    "ZENHUB_API_KEY",
  ]
  env = {
    PR_COLUMN = "5c92522983c46e630dc18373"
  }
}
