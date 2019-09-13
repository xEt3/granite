workflow "ZH Automation - PR Manage" {
  resolves = ["call_zh_automations"]
  on = "pull_request"
}

action "call_zh_automations" {
  uses = "james1x0/zenhub-automations@master"
  secrets = [
    "GITHUB_TOKEN",
    "ZENHUB_API_KEY",
  ]
  env = {
    PR_COLUMN = "5c92522983c46e630dc18373"
    INPROG_COLUMN = "5c92522983c46e630dc18372"
    REVIEW_COLUMN = "5c92522983c46e630dc18373"
  }
}

workflow "ZH Automation - Branch Manage" {
  on = "create"
  resolves = ["james1x0/zenhub-automations@master"]
}

action "james1x0/zenhub-automations@master" {
  uses = "james1x0/zenhub-automations@master"
  secrets = ["GITHUB_TOKEN", "ZENHUB_API_KEY"]
  env = {
    PR_COLUMN = "5c92522983c46e630dc18373"
    REVIEW_COLUMN = "5c92522983c46e630dc18373"
    INPROG_COLUMN = "5c92522983c46e630dc18372"
  }
}
