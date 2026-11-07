# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\TMS-Module\Product\01-product-master.spec.ts >> Product Master - End to End Flow
- Location: tests\TMS-Module\Product\01-product-master.spec.ts:25:5

# Error details

```
Test timeout of 90000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=f3e1]:
  - generic [ref=f3e2]:
    - banner [ref=f3e5]:
      - generic [ref=f3e6]:
        - generic [ref=f3e7]:
          - button "menu" [ref=f3e9] [cursor=pointer]
          - separator [ref=f3e22]
          - paragraph [ref=f3e24]: Import
        - generic [ref=f3e25]:
          - generic [ref=f3e28]:
            - button [ref=f3e29] [cursor=pointer]
            - button [ref=f3e33] [cursor=pointer]
          - separator [ref=f3e39]
          - generic [ref=f3e40]:
            - button [ref=f3e42] [cursor=pointer]
            - button [ref=f3e47] [cursor=pointer]
            - button "notifications" [ref=f3e57] [cursor=pointer]
            - button [ref=f3e67] [cursor=pointer]
            - button [ref=f3e74] [cursor=pointer]
            - button "notifications" [ref=f3e82] [cursor=pointer]
            - button [ref=f3e88] [cursor=pointer]
            - button [ref=f3e93] [cursor=pointer]
            - paragraph [ref=f3e98]: Welcome Back., Trainee
    - generic [ref=f3e102]:
      - generic [ref=f3e105]:
        - heading "File to Import*" [level=5] [ref=f3e108]
        - generic [ref=f3e110]:
          - generic [ref=f3e113]:
            - textbox [ref=f3e114]: Import_Product_Master.xlsx
            - group
          - generic [ref=f3e115]:
            - generic [ref=f3e116]:
              - button "Import" [disabled]
            - button "Clear" [ref=f3e119] [cursor=pointer]
        - button "Upload" [ref=f3e125] [cursor=pointer]
      - separator [ref=f3e130]
      - generic [ref=f3e131]:
        - heading "Preview Data" [level=5] [ref=f3e132]
        - generic [ref=f3e133]:
          - heading "Incorrect row data" [level=5] [ref=f3e135]
          - heading "2,K - Default Product Unit is duplicated." [level=5] [ref=f3e137]
  - status [ref=f3e139]
```