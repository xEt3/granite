workflow "ZH Automation - PR Manage" {
  on = "pull_request"
  resolves = ["call_zh_automations"]
}

action "call_zh_automations" {
  uses = "james1x0/zenhub-automations@master"
  secrets = ["GITHUB_TOKEN"]
}

