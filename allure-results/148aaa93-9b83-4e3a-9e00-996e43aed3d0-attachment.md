# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\TMS-Module\Employees\01-employee.spec.ts >> Employees
- Location: tests\TMS-Module\Employees\01-employee.spec.ts:27:5

# Error details

```
Error: locator.click: Error: strict mode violation: getByText('AGG UAT', { exact: true }) resolved to 2 elements:
    1) <td role="cell" class="MuiTableCell-root MuiTableCell-body jss2143 jss2146 jss2135 jss2194 MuiTableCell-alignLeft">AGG  UAT</td> aka locator('#root').getByText('AGG UAT')
    2) <h5 class="MuiTypography-root MuiTypography-h5">AGG  UAT</h5> aka getByRole('heading', { name: 'AGG UAT' })

Call log:
  - waiting for getByText('AGG UAT', { exact: true })

```

# Page snapshot

```yaml
- generic [ref=f3e1]:
  - generic [ref=f3e2]:
    - banner [ref=f3e5]:
      - generic [ref=f3e6]:
        - generic [ref=f3e7]:
          - button [ref=f3e9] [cursor=pointer]
          - separator [ref=f3e22]
          - paragraph [ref=f3e24]: Employees
        - generic [ref=f3e25]:
          - generic [ref=f3e28]:
            - button [ref=f3e29] [cursor=pointer]
            - button [ref=f3e33] [cursor=pointer]
            - button [ref=f3e37] [cursor=pointer]
          - separator [ref=f3e43]
          - generic [ref=f3e44]:
            - button [ref=f3e46] [cursor=pointer]
            - button [ref=f3e51] [cursor=pointer]
            - button [ref=f3e61] [cursor=pointer]
            - button [ref=f3e71] [cursor=pointer]
            - button [ref=f3e78] [cursor=pointer]
            - button [ref=f3e86] [cursor=pointer]
            - button [ref=f3e92] [cursor=pointer]
            - button [ref=f3e97] [cursor=pointer]
            - paragraph [ref=f3e102]: Welcome Back., Trainee
    - generic [ref=f3e107]:
      - generic [ref=f3e111]:
        - button [expanded] [ref=f3e112] [cursor=pointer]:
          - generic [ref=f3e113]:
            - heading [level=4] [ref=f3e119]: Search
            - heading [level=4] [ref=f3e122]: "Total : 1"
        - region [ref=f3e130]:
          - generic [ref=f3e135]:
            - generic [ref=f3e138] [cursor=pointer]:
              - generic: Business Unit
              - generic [ref=f3e139]:
                - textbox [ref=f3e140]: 0 item(s) selected
                - generic [ref=f3e142]:
                  - button [ref=f3e143]
                  - button [ref=f3e147]
                - group
            - generic [ref=f3e153]:
              - generic: Type
              - generic [ref=f3e154] [cursor=pointer]:
                - textbox [ref=f3e155]
                - button [ref=f3e158]
                - group
            - generic [ref=f3e163]:
              - button [ref=f3e165] [cursor=pointer]:
                - generic [ref=f3e166]: Reset
              - button [ref=f3e168] [cursor=pointer]:
                - generic [ref=f3e169]: Search
      - generic [ref=f3e170]:
        - generic [ref=f3e174]:
          - generic: Filter by Employee ID, First Name, Last Name
          - generic [ref=f3e175]:
            - textbox [ref=f3e176]: EMP26102701
            - button [ref=f3e177] [cursor=pointer]
            - group
        - table [ref=f3e183]:
          - rowgroup [ref=f3e184]:
            - row [ref=f3e185]:
              - columnheader [ref=f3e186]: Action
              - columnheader [ref=f3e187]: Employee ID
              - columnheader [ref=f3e188]: First Name
              - columnheader [ref=f3e189]: Last Name
              - columnheader [ref=f3e190]: Business Unit
              - columnheader [ref=f3e191]: Type
              - columnheader [ref=f3e192]: Update Date
              - columnheader [ref=f3e193]: Update By
              - columnheader [ref=f3e194]: Create Date
              - columnheader [ref=f3e195]: Create By
          - rowgroup [ref=f3e196]:
            - row [ref=f3e197]:
              - cell [ref=f3e198]:
                - generic [ref=f3e199]:
                  - button [ref=f3e200] [cursor=pointer]
                  - separator [ref=f3e206]
                  - button [ref=f3e207] [cursor=pointer]
              - cell [ref=f3e215]:
                - generic [ref=f3e216]: EMP26102701
              - cell [ref=f3e217]: ชื่อจริง
              - cell [ref=f3e218]: นามสกุล
              - cell [ref=f3e219]: AGG UAT
              - cell [ref=f3e220]: Employee
              - cell [ref=f3e221]: 27/10/2026 11:17
              - cell [ref=f3e222]: trainee03
              - cell [ref=f3e223]: 27/10/2026 11:17
              - cell [ref=f3e224]: trainee03
        - generic [ref=f3e226]:
          - navigation [ref=f3e228]:
            - list [ref=f3e229]:
              - listitem [ref=f3e230]:
                - button [disabled]
              - listitem [ref=f3e231]:
                - button [disabled]
              - listitem [ref=f3e232]:
                - button [ref=f3e233] [cursor=pointer]: "1"
              - listitem [ref=f3e234]:
                - button [disabled]
              - listitem [ref=f3e235]:
                - button [disabled]
          - generic [ref=f3e237]:
            - combobox [ref=f3e238] [cursor=pointer]
            - group
          - heading [level=5] [ref=f3e242]: 1 - 1 of 1 items
  - generic [ref=f3e246]:
    - generic [ref=f3e247]:
      - generic [ref=f3e250]:
        - textbox [active] [ref=f3e251]: AGG
        - group
      - generic [ref=f3e256] [cursor=pointer]:
        - checkbox "Include Sub Business Units" [checked] [ref=f3e259]
        - heading "Include Sub Business Units" [level=5] [ref=f3e263]
      - separator [ref=f3e264]
    - tree [ref=f3e266]:
      - treeitem [expanded] [ref=f3e267]:
        - generic [ref=f3e276] [cursor=pointer]:
          - generic:
            - generic:
              - checkbox "AGG UAT" [disabled]
          - heading "AGG UAT" [level=5] [ref=f3e278]
        - group [ref=f3e280]:
          - generic [ref=f3e282]:
            - treeitem [ref=f3e283]:
              - generic [ref=f3e292] [cursor=pointer]:
                - generic:
                  - generic:
                    - checkbox "111" [disabled]
                - heading "111" [level=5] [ref=f3e294]
            - treeitem [ref=f3e295]:
              - generic [ref=f3e304] [cursor=pointer]:
                - generic:
                  - generic:
                    - checkbox "aaa" [disabled]
                - heading "aaa" [level=5] [ref=f3e306]
            - treeitem [ref=f3e307]:
              - generic [ref=f3e316] [cursor=pointer]:
                - generic:
                  - generic:
                    - checkbox "ASON" [disabled]
                - heading "ASON" [level=5] [ref=f3e318]
            - treeitem [ref=f3e319]:
              - generic [ref=f3e328] [cursor=pointer]:
                - generic:
                  - generic:
                    - checkbox "donbu" [disabled]
                - heading "donbu" [level=5] [ref=f3e330]
            - treeitem [expanded] [ref=f3e331]:
              - generic [ref=f3e340] [cursor=pointer]:
                - generic:
                  - generic:
                    - checkbox "eed" [disabled]
                - heading "eed" [level=5] [ref=f3e342]
              - group [ref=f3e344]:
                - treeitem [ref=f3e347]:
                  - generic [ref=f3e356] [cursor=pointer]:
                    - generic:
                      - generic:
                        - checkbox "eed3" [disabled]
                    - heading "eed3" [level=5] [ref=f3e358]
            - treeitem [ref=f3e359]:
              - generic [ref=f3e368] [cursor=pointer]:
                - generic:
                  - generic:
                    - checkbox "MKC" [disabled]
                - heading "MKC" [level=5] [ref=f3e370]
            - treeitem [ref=f3e371]:
              - generic [ref=f3e380] [cursor=pointer]:
                - generic:
                  - generic:
                    - checkbox "MPC" [disabled]
                - heading "MPC" [level=5] [ref=f3e382]
            - treeitem [ref=f3e383]:
              - generic [ref=f3e392] [cursor=pointer]:
                - generic:
                  - generic:
                    - checkbox "test bug from mail" [disabled]
                - heading "test bug from mail" [level=5] [ref=f3e394]
            - treeitem [ref=f3e395]:
              - generic [ref=f3e404] [cursor=pointer]:
                - generic:
                  - generic:
                    - checkbox "test bug from mail2" [disabled]
                - heading "test bug from mail2" [level=5] [ref=f3e406]
            - treeitem [ref=f3e407]:
              - generic [ref=f3e416] [cursor=pointer]:
                - generic:
                  - generic:
                    - checkbox "test bug from mail3" [disabled]
                - heading "test bug from mail3" [level=5] [ref=f3e418]
            - treeitem [ref=f3e419]:
              - generic [ref=f3e428] [cursor=pointer]:
                - generic:
                  - generic:
                    - checkbox "xx" [disabled]
                - heading "xx" [level=5] [ref=f3e430]
            - treeitem [ref=f3e431]:
              - generic [ref=f3e440] [cursor=pointer]:
                - generic:
                  - generic:
                    - checkbox "รัตนมงคลบางปะอินขนส่ง" [disabled]
                - heading "รัตนมงคลบางปะอินขนส่ง" [level=5] [ref=f3e442]
            - treeitem [ref=f3e443]:
              - generic [ref=f3e452] [cursor=pointer]:
                - generic:
                  - generic:
                    - checkbox "สยามโลจิสติกส์ จำกัด" [disabled]
                - heading "สยามโลจิสติกส์ จำกัด" [level=5] [ref=f3e454]
```

# Test source

```ts
  113 | 
  114 |   await test.step("5. View Employee", async () => {
  115 |     // ค้นหาโดยใช้ตัวแปร TARGET_EMPLOYEE_ID โดยตรง
  116 |     const searchInput = page
  117 |       .locator("label")
  118 |       .filter({ hasText: /Filter by/i })
  119 |       .locator("..")
  120 |       .locator("input");
  121 |     await searchInput.waitFor({ state: "visible" });
  122 |     await searchInput.click();
  123 |     await searchInput.fill(TARGET_EMPLOYEE_ID);
  124 |     await searchInput.press("Enter");
  125 |     await page.waitForTimeout(WAIT_TIME);
  126 | 
  127 |     await page.getByText(TARGET_EMPLOYEE_ID, { exact: true }).click();
  128 |     await page.waitForTimeout(WAIT_TIME);
  129 | 
  130 |     await page.locator("button").nth(2).click(); // ปุ่ม Back
  131 |   });
  132 | 
  133 |   await test.step("6. Update Product (Details & Table)", async () => {
  134 |     const searchInput = page
  135 |       .locator("label")
  136 |       .filter({ hasText: /Filter by/i })
  137 |       .locator("..")
  138 |       .locator("input");
  139 | 
  140 |     // --- แก้ไขผ่านหน้ารายละเอียด (Details) ---
  141 |     await searchInput.click();
  142 |     await searchInput.fill(TARGET_EMPLOYEE_ID);
  143 |     await searchInput.press("Enter");
  144 |     await page.waitForTimeout(WAIT_TIME);
  145 | 
  146 |     await page.getByText(TARGET_EMPLOYEE_ID, { exact: true }).click();
  147 |     await page.waitForTimeout(WAIT_TIME);
  148 | 
  149 |     await page.locator("button").nth(1).click(); // ปุ่ม Edit
  150 |     await page.waitForTimeout(WAIT_TIME);
  151 |     await page.locator('input[name="firstName"]').fill(TEST_FIRSTNAME_UPDATE);
  152 |     await page.getByRole("button", { name: "Save" }).click();
  153 |     await page.getByRole("button", { name: "OK" }).click();
  154 |     await page.waitForTimeout(WAIT_TIME);
  155 | 
  156 |     // --- แก้ไขผ่าน row (Details) ---
  157 |     await searchInput.click();
  158 |     await searchInput.fill(TARGET_EMPLOYEE_ID);
  159 |     await searchInput.press("Enter");
  160 |     await page.waitForTimeout(WAIT_TIME);
  161 | 
  162 |     const row = page.locator("tr").filter({
  163 |       has: page.getByRole("cell", { name: TARGET_EMPLOYEE_ID, exact: true }),
  164 |     });
  165 |     const editBtn = row.locator("button").first();
  166 |     await editBtn.waitFor({ state: "visible" });
  167 |     await editBtn.click();
  168 | 
  169 |     await page.waitForTimeout(WAIT_TIME);
  170 |     await page.locator('input[name="lastName"]').fill(TEST_LASTNAME_UPDATE);
  171 |     await page.getByRole("button", { name: "Save" }).click();
  172 |     await page.getByRole("button", { name: "OK" }).click();
  173 |     await page.waitForTimeout(WAIT_TIME);
  174 |   });
  175 | 
  176 |   await test.step("7. Delete Product", async () => {
  177 |     const searchInput = page
  178 |       .locator("label")
  179 |       .filter({ hasText: /Filter by/i })
  180 |       .locator("..")
  181 |       .locator("input");
  182 | 
  183 |     await searchInput.click();
  184 |     await searchInput.fill(TARGET_EMPLOYEE_ID);
  185 |     await searchInput.press("Enter");
  186 |     await page.waitForTimeout(WAIT_TIME);
  187 | 
  188 |     const row = page.locator("tr").filter({
  189 |       has: page.getByRole("cell", { name: TARGET_EMPLOYEE_ID, exact: true }),
  190 |     });
  191 |     const deleteBtn = row.locator("button").nth(1);
  192 |     await deleteBtn.waitFor({ state: "visible" });
  193 |     await deleteBtn.click();
  194 | 
  195 |     await page.getByRole("button", { name: "Cancel" }).click();
  196 |     await page.waitForTimeout(WAIT_TIME);
  197 |   });
  198 | 
  199 | 
  200 |   await test.step("4. Advanced Search", async () => {
  201 |     await page.getByRole("button", { name: "Search Total :" }).click();
  202 | 
  203 |     // --- ค้นหาด้วย Business Unit ---
  204 |     await openDropdown(/Business Unit/i);
  205 |     await page
  206 |       .getByRole("checkbox", { name: "Include Sub Business Units" })
  207 |       .uncheck();
  208 |     await page
  209 |       .getByRole("checkbox", { name: "Include Sub Business Units" })
  210 |       .check();
  211 |     await page.getByRole("textbox").fill(TEST_BU_SEARCH);
  212 |     await page.waitForTimeout(WAIT_TIME);
> 213 |     await page.getByText(TEST_BU_NAME, { exact: true }).click({ force: true });
      |                                                         ^ Error: locator.click: Error: strict mode violation: getByText('AGG UAT', { exact: true }) resolved to 2 elements:
  214 |     await page.keyboard.press("Escape");
  215 |     await page.getByRole("button", { name: "Search", exact: true }).click();
  216 |     await page.getByRole("button", { name: "clear" }).click();
  217 | 
  218 |     // --- ค้นหาด้วย Type ---
  219 |     await openDropdown(/Type/i);
  220 |     await page.getByRole("textbox").fill(TEST_EMPLOYEE_TYPE);
  221 |     await page.getByRole("menuitem", { name: TEST_EMPLOYEE_TYPE }).click();
  222 |     await page.keyboard.press("Escape");
  223 |     await page.getByRole("button", { name: "Search", exact: true }).click();
  224 | 
  225 |     // --- Reset ค่าทั้งหมด ---
  226 |     await page.getByRole("button", { name: "Reset" }).click();
  227 |     await page.waitForTimeout(WAIT_TIME);
  228 |   });
  229 | 
  230 |   await page.pause();
  231 | });
```