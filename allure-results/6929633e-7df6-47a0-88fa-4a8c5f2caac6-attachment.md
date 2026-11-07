# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests_PostTest\TMS-Module\DO-Cat\01-do-category.spec.ts >> Delivery Order Categories - CRUD Flow
- Location: tests_PostTest\TMS-Module\DO-Cat\01-do-category.spec.ts:15:5

# Error details

```
Test timeout of 90000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=f3e2]:
  - banner [ref=f3e5]:
    - generic [ref=f3e6]:
      - generic [ref=f3e7]:
        - button "menu" [ref=f3e9] [cursor=pointer]
        - separator [ref=f3e22]
        - paragraph [ref=f3e24]: Update Delivery Order Category
      - generic [ref=f3e25]:
        - button [ref=f3e29] [cursor=pointer]
        - separator [ref=f3e35]
        - generic [ref=f3e36]:
          - button [ref=f3e38] [cursor=pointer]
          - button [ref=f3e43] [cursor=pointer]
          - button "notifications" [ref=f3e53] [cursor=pointer]
          - button [ref=f3e63] [cursor=pointer]
          - button [ref=f3e70] [cursor=pointer]
          - button "notifications" [ref=f3e78] [cursor=pointer]
          - button [ref=f3e84] [cursor=pointer]
          - button [ref=f3e89] [cursor=pointer]
          - paragraph [ref=f3e94]: Welcome Back., Trainee
  - generic [ref=f3e98]:
    - generic [ref=f3e100]:
      - generic [ref=f3e103]:
        - generic:
          - text: Order
          - generic: "*"
        - generic [ref=f3e104]:
          - textbox [ref=f3e105]: "0"
          - group
      - generic [ref=f3e108]:
        - generic:
          - text: Code
          - generic: "*"
        - generic [ref=f3e109]:
          - textbox [ref=f3e110]: AT000
          - group
      - generic [ref=f3e113]:
        - generic:
          - text: Name
          - generic: "*"
        - generic [ref=f3e114]:
          - textbox [ref=f3e115]: ATest DO Category
          - group
      - generic [ref=f3e118]:
        - generic:
          - text: Enable
          - generic: "*"
        - generic [ref=f3e119] [cursor=pointer]:
          - textbox [ref=f3e120]: Inactive
          - generic [ref=f3e122]:
            - button "clear" [ref=f3e123]
            - button [ref=f3e127]
          - group
      - paragraph [ref=f3e132] [cursor=pointer]:
        - checkbox [checked] [ref=f3e135]
        - text: Enable Assign Quota
      - generic [ref=f3e140]:
        - generic: Description
        - generic [ref=f3e141]:
          - textbox [active] [ref=f3e142]: Automate Test Update 2 d
          - group
    - separator [ref=f3e144]
    - generic [ref=f3e147]:
      - button "Save" [ref=f3e149] [cursor=pointer]
      - button "Cancel" [ref=f3e152] [cursor=pointer]
```