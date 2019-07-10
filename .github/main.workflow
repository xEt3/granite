workflow "ZH Automation - PR Manage" {
  on = "pull_request"
  resolves = ["Call Zenhub Automations"]
}

action "Call Zenhub Automations" {
  uses = "james1x0/zh-automations@master"
  secrets = ["GITHUB_TOKEN"]
}
