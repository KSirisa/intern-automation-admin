# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Admin-Module\TC009-Configurations\Alert\01-create-alert.spec.ts >> alert configurations test
- Location: tests\Admin-Module\TC009-Configurations\Alert\01-create-alert.spec.ts:740:5

# Error details

```
Test timeout of 90000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - navigation [ref=e4]:
      - button [expanded] [ref=e5]:
        - img [ref=e6]:
          - generic "background" [ref=e7]
    - generic "Switch Task" [ref=e28] [cursor=pointer]
    - generic [ref=e32]: Alert Configurations
    - link "Workspace Mode" [ref=e42] [cursor=pointer]:
      - /url: /
    - link "Hello, trainee03 UAT Corporation" [ref=e54] [cursor=pointer]:
      - /url: "#"
      - generic [ref=e56]:
        - generic [ref=e57]: Hello, trainee03
        - generic [ref=e58]: UAT Corporation
  - generic [ref=e59]:
    - navigation [ref=e61]:
      - button "Show Menu" [ref=e62] [cursor=pointer]
      - list [ref=e66]:
        - listitem [ref=e67] [cursor=pointer]:
          - generic "Business Unit" [ref=e68]
        - listitem [ref=e72] [cursor=pointer]:
          - generic "Groups" [ref=e73]
        - listitem [ref=e82] [cursor=pointer]:
          - generic "Users" [ref=e83]
        - listitem [ref=e88] [cursor=pointer]:
          - generic "Assets" [ref=e89]
        - listitem [ref=e96] [cursor=pointer]:
          - generic "Maintenance" [ref=e97]
        - listitem [ref=e105] [cursor=pointer]:
          - generic "Driver Checklist" [ref=e106]
        - listitem [ref=e113] [cursor=pointer]:
          - generic "Driver Performance Rules" [ref=e114]
        - listitem [ref=e118] [cursor=pointer]:
          - generic "Reports" [ref=e119]
        - listitem [ref=e126] [cursor=pointer]:
          - generic "Configurations" [ref=e127]
        - listitem [ref=e133] [cursor=pointer]:
          - generic "Cash Van" [ref=e134]
    - generic [ref=e145]:
      - generic [ref=e146]:
        - generic [ref=e149]:
          - generic:
            - heading "Alert Configurations" [level=2] [ref=e150]
            - heading [level=3]
        - generic [ref=e151]:
          - button "Alert Configurations" [ref=e154] [cursor=pointer]
          - button "Minimize" [ref=e157] [cursor=pointer]
          - button "Maximize" [ref=e162] [cursor=pointer]
          - button "Close" [ref=e167] [cursor=pointer]
        - list [ref=e175]:
          - listitem [ref=e176]:
            - generic "Create" [ref=e177] [cursor=pointer]
          - listitem [ref=e182]:
            - generic "Search" [ref=e183] [cursor=pointer]
      - generic [ref=e198]:
        - generic [ref=e199]:
          - generic [ref=e200]:
            - generic [ref=e202]:
              - textbox [active] [ref=e204]:
                - /placeholder: Filter by Description
                - text: Automate Abnormal
              - generic "Clear" [ref=e205] [cursor=pointer]
            - generic [ref=e211]:
              - generic [ref=e212]: "20"
              - combobox [ref=e213] [cursor=pointer]:
                - option "20" [selected]
                - option "50"
                - option "100"
                - option "All"
            - generic [ref=e214]: 1 of 131
          - generic [ref=e215]:
            - grid [ref=e218]:
              - rowgroup [ref=e219]:
                - row [ref=e220]:
                  - 'columnheader "Alert Type: activate to sort column ascending" [ref=e221] [cursor=pointer]': Alert Type 
                  - 'columnheader "Description: activate to sort column ascending" [ref=e222] [cursor=pointer]': Description 
                  - 'columnheader "Website: activate to sort column ascending" [ref=e223] [cursor=pointer]': Website 
                  - 'columnheader "Email: activate to sort column ascending" [ref=e224] [cursor=pointer]': Email 
                  - 'columnheader "SMS: activate to sort column ascending" [ref=e225] [cursor=pointer]': SMS 
                  - 'columnheader "Ticket: activate to sort column ascending" [ref=e226] [cursor=pointer]': Ticket 
                  - 'columnheader "MDVR: activate to sort column ascending" [ref=e227] [cursor=pointer]': MDVR 
                  - 'columnheader "Report: activate to sort column ascending" [ref=e228] [cursor=pointer]': Report 
                  - 'columnheader "Line: activate to sort column ascending" [ref=e229] [cursor=pointer]': Line 
                  - 'columnheader "Mobile: activate to sort column ascending" [ref=e230] [cursor=pointer]': Mobile 
                  - 'columnheader "Priority: activate to sort column ascending" [ref=e231] [cursor=pointer]': Priority 
                  - 'columnheader "Enable: activate to sort column ascending" [ref=e232] [cursor=pointer]': Enable 
            - grid [ref=e234]:
              - rowgroup [ref=e235]:
                - row [ref=e236]:
                  - gridcell "Abnormal" [ref=e237]
                  - gridcell "Automate" [ref=e238]
                  - gridcell "No" [ref=e239]
                  - gridcell "No" [ref=e240]
                  - gridcell "No" [ref=e241]
                  - gridcell "Yes" [ref=e242]
                  - gridcell "Yes" [ref=e243]
                  - gridcell "No" [ref=e244]
                  - gridcell "No" [ref=e245]
                  - gridcell "No" [ref=e246]
                  - gridcell "111" [ref=e247]
                  - gridcell "Yes" [ref=e248]
        - button "Load more" [ref=e250] [cursor=pointer]
```