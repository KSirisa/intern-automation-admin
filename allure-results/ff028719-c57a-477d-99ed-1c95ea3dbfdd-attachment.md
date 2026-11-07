# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\TMS-Module\Product\01-product-master.spec.ts >> Product Master - End to End Flow
- Location: tests\TMS-Module\Product\01-product-master.spec.ts:25:5

# Error details

```
Error: locator.check: Clicking the checkbox did not change its state
Call log:
  - waiting for getByRole('paragraph').filter({ hasText: 'Is Hazardous' }).getByRole('checkbox')
    - locator resolved to <input value="" class="jss394" type="checkbox" data-indeterminate="false"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div aria-hidden="true" role="presentation" class="MuiPopover-root">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div aria-hidden="true" role="presentation" class="MuiPopover-root">…</div> intercepts pointer events
  - retrying click action
    - waiting 100ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action
    - click action done
    - waiting for scheduled navigations to finish
    - navigations have finished

```

# Page snapshot

```yaml
- generic [ref=f3e1]:
  - generic [ref=f3e2] [cursor=pointer]:
    - banner [ref=f3e5]:
      - generic [ref=f3e6]:
        - generic [ref=f3e7]:
          - button "menu" [ref=f3e9]
          - separator [ref=f3e22]
          - paragraph [ref=f3e24]: Create Product
        - generic [ref=f3e25]:
          - button [ref=f3e28]
          - separator [ref=f3e34]
          - generic [ref=f3e35]:
            - button [ref=f3e37]
            - button [ref=f3e42]
            - button "notifications" [ref=f3e52]
            - button [ref=f3e62]
            - button [ref=f3e69]
            - button "notifications" [ref=f3e77]
            - button [ref=f3e83]
            - button [ref=f3e88]
            - paragraph [ref=f3e93]: Welcome Back., Trainee
    - generic [ref=f3e97]:
      - generic [ref=f3e99]:
        - generic [ref=f3e113]:
          - generic [ref=f3e116]:
            - generic:
              - text: Code
              - generic: "*"
            - generic [ref=f3e117]:
              - textbox [ref=f3e118]: AT101
              - group
          - generic [ref=f3e121]:
            - generic:
              - text: Name
              - generic: "*"
            - generic [ref=f3e122]:
              - textbox [ref=f3e123]: ATest
              - group
          - generic [ref=f3e126]:
            - generic: Short Name
            - generic [ref=f3e127]:
              - textbox [ref=f3e128]: AT
              - group
          - generic [ref=f3e131]:
            - generic:
              - text: Category
              - generic: "*"
            - generic [ref=f3e132]:
              - textbox [ref=f3e133]: ATest Product Categories
              - generic [ref=f3e135]:
                - button "clear" [ref=f3e136]
                - button [ref=f3e140]
              - group
          - generic [ref=f3e146]:
            - generic: Product Types
            - generic [ref=f3e147]:
              - textbox [ref=f3e148]: ATest Product Types
              - generic [ref=f3e150]:
                - button "clear" [ref=f3e151]
                - button [ref=f3e155]
              - group
          - generic [ref=f3e161]:
            - generic:
              - text: Enable
              - generic: "*"
            - generic [ref=f3e162]:
              - textbox [ref=f3e163]: Active
              - generic [ref=f3e165]:
                - button "clear" [ref=f3e166]
                - button [ref=f3e170]
              - group
          - generic [ref=f3e176]:
            - generic: Type
            - generic [ref=f3e177]:
              - textbox [ref=f3e178]: Finished Goods
              - generic [ref=f3e180]:
                - button "clear" [ref=f3e181]
                - button [ref=f3e185]
              - group
          - paragraph [ref=f3e190]:
            - checkbox [checked] [active] [ref=f3e193]
            - text: Is Hazardous
          - generic [ref=f3e198]:
            - generic:
              - text: Hazardous Class
              - generic: "*"
            - generic [ref=f3e199]:
              - textbox [ref=f3e200]
              - group
          - generic [ref=f3e203]:
            - generic:
              - text: UN Number
              - generic: "*"
            - generic [ref=f3e204]:
              - textbox [ref=f3e205]
              - group
          - generic [ref=f3e208]:
            - generic: Description
            - generic [ref=f3e209]:
              - textbox [ref=f3e210]
              - group
          - generic [ref=f3e213]:
            - generic: ItemGroup_Copy
            - generic [ref=f3e214]:
              - textbox [ref=f3e215]
              - group
          - generic [ref=f3e218]:
            - generic: ItemGroupDesc_Copy
            - generic [ref=f3e219]:
              - textbox [ref=f3e220]
              - group
          - generic [ref=f3e223]:
            - generic: TSL_Required
            - generic [ref=f3e224]:
              - textbox [ref=f3e225]
              - group
          - generic [ref=f3e228]:
            - generic: TSL_DisplayOnPOD
            - generic [ref=f3e229]:
              - textbox [ref=f3e230]
              - group
          - generic [ref=f3e233]:
            - generic: TSL_Required_DisplayOnPOD
            - generic [ref=f3e234]:
              - textbox [ref=f3e235]
              - group
        - generic [ref=f3e237]:
          - generic [ref=f3e238]:
            - heading "Product UOM *" [level=4] [ref=f3e239]
            - generic [ref=f3e241]:
              - table [ref=f3e246]:
                - rowgroup [ref=f3e247]:
                  - row [ref=f3e248]:
                    - columnheader "Action" [ref=f3e249]
                    - columnheader "Name" [ref=f3e250]
                    - columnheader "Default" [ref=f3e251]
                - rowgroup [ref=f3e252]:
                  - row [ref=f3e253]:
                    - cell [ref=f3e254]:
                      - heading "No item to display" [level=5] [ref=f3e255]
              - button "Add" [ref=f3e258]
          - generic [ref=f3e260]:
            - heading "Accessible Business Units *" [level=4] [ref=f3e261]
            - generic [ref=f3e263]:
              - generic [ref=f3e266]:
                - textbox [ref=f3e267]
                - group
              - generic [ref=f3e272]:
                - checkbox "Include Sub Business Units" [checked] [ref=f3e275]
                - heading "Include Sub Business Units" [level=5] [ref=f3e279]
              - separator [ref=f3e280]
              - tree [ref=f3e282]:
                - treeitem [expanded] [ref=f3e283]:
                  - generic [ref=f3e292]:
                    - generic:
                      - generic:
                        - checkbox "___TEST" [disabled]
                    - heading "___TEST" [level=5] [ref=f3e294]
                  - group [ref=f3e296]:
                    - generic [ref=f3e298]:
                      - treeitem [ref=f3e299]:
                        - generic [ref=f3e308]:
                          - generic:
                            - generic:
                              - checkbox "RTs1" [disabled]
                          - heading "RTs1" [level=5] [ref=f3e310]
                      - treeitem [ref=f3e311]:
                        - generic [ref=f3e320]:
                          - generic:
                            - generic:
                              - checkbox "RTs2" [disabled]
                          - heading "RTs2" [level=5] [ref=f3e322]
                      - treeitem [ref=f3e323]:
                        - generic [ref=f3e332]:
                          - generic:
                            - generic:
                              - checkbox "RTs3" [disabled]
                          - heading "RTs3" [level=5] [ref=f3e334]
                - treeitem [expanded] [ref=f3e335]:
                  - generic [ref=f3e344]:
                    - generic:
                      - generic:
                        - checkbox "__Warehouse" [disabled]
                    - heading "__Warehouse" [level=5] [ref=f3e346]
                  - group [ref=f3e348]:
                    - treeitem [expanded] [ref=f3e351]:
                      - generic [ref=f3e360]:
                        - generic:
                          - generic:
                            - checkbox "Plant" [disabled]
                        - heading "Plant" [level=5] [ref=f3e362]
                      - group [ref=f3e364]:
                        - treeitem [expanded] [ref=f3e367]:
                          - generic [ref=f3e376]:
                            - generic:
                              - generic:
                                - checkbox "WH1" [disabled]
                            - heading "WH1" [level=5] [ref=f3e378]
                          - group [ref=f3e380]:
                            - generic [ref=f3e382]:
                              - treeitem [ref=f3e383]:
                                - generic [ref=f3e392]:
                                  - generic:
                                    - generic:
                                      - checkbox "SFL1" [disabled]
                                  - heading "SFL1" [level=5] [ref=f3e394]
                              - treeitem [ref=f3e395]:
                                - generic [ref=f3e404]:
                                  - generic:
                                    - generic:
                                      - checkbox "SFL2" [disabled]
                                  - heading "SFL2" [level=5] [ref=f3e406]
                - treeitem [expanded] [ref=f3e407]:
                  - generic [ref=f3e416]:
                    - generic:
                      - generic:
                        - checkbox "_ePOD Test Distance" [disabled]
                    - heading "_ePOD Test Distance" [level=5] [ref=f3e418]
                  - group [ref=f3e420]:
                    - generic [ref=f3e422]:
                      - treeitem [ref=f3e423]:
                        - generic [ref=f3e432]:
                          - generic:
                            - generic:
                              - checkbox "100 โกโก ทรานสปอร์ต 100" [disabled]
                          - heading "100 โกโก ทรานสปอร์ต 100" [level=5] [ref=f3e434]
                      - treeitem [ref=f3e435]:
                        - generic [ref=f3e444]:
                          - generic:
                            - generic:
                              - checkbox "100 ชนินทร์ ทรานสปอร์ท จำกัด" [disabled]
                          - heading "100 ชนินทร์ ทรานสปอร์ท จำกัด" [level=5] [ref=f3e446]
                      - treeitem [ref=f3e447]:
                        - generic [ref=f3e456]:
                          - generic:
                            - generic:
                              - checkbox "100 ยิ่งเจริญโลจิสติก" [disabled]
                          - heading "100 ยิ่งเจริญโลจิสติก" [level=5] [ref=f3e458]
                      - treeitem [ref=f3e459]:
                        - generic [ref=f3e468]:
                          - generic:
                            - generic:
                              - checkbox "150 หาดใหญ่ พี. เอ็ม" [disabled]
                          - heading "150 หาดใหญ่ พี. เอ็ม" [level=5] [ref=f3e470]
                      - treeitem [ref=f3e471]:
                        - generic [ref=f3e480]:
                          - generic:
                            - generic:
                              - checkbox "30 BLOCK" [disabled]
                          - heading "30 BLOCK" [level=5] [ref=f3e482]
                      - treeitem [ref=f3e483]:
                        - generic [ref=f3e492]:
                          - generic:
                            - generic:
                              - checkbox "30 เสริมสินไพบูลย์" [disabled]
                          - heading "30 เสริมสินไพบูลย์" [level=5] [ref=f3e494]
                      - treeitem [ref=f3e495]:
                        - generic [ref=f3e504]:
                          - generic:
                            - generic:
                              - checkbox "30 แอ๊ดวานซ์ อัลไลแอนซ์ โลจิสติกส์" [disabled]
                          - heading "30 แอ๊ดวานซ์ อัลไลแอนซ์ โลจิสติกส์" [level=5] [ref=f3e506]
                      - treeitem [ref=f3e507]:
                        - generic [ref=f3e516]:
                          - generic:
                            - generic:
                              - checkbox "50 DA" [disabled]
                          - heading "50 DA" [level=5] [ref=f3e518]
                      - treeitem [ref=f3e519]:
                        - generic [ref=f3e528]:
                          - generic:
                            - generic:
                              - checkbox "50 นวลอนงค์ จำกัด" [disabled]
                          - heading "50 นวลอนงค์ จำกัด" [level=5] [ref=f3e530]
                      - treeitem [ref=f3e531]:
                        - generic [ref=f3e540]:
                          - generic:
                            - generic:
                              - checkbox "50 ลีโอ ลิ้งค" [disabled]
                          - heading "50 ลีโอ ลิ้งค" [level=5] [ref=f3e542]
                      - treeitem [ref=f3e543]:
                        - generic [ref=f3e552]:
                          - generic:
                            - generic:
                              - checkbox "50 วงศ์ทวีทรัพย์ขนส่ง จำกัด" [disabled]
                          - heading "50 วงศ์ทวีทรัพย์ขนส่ง จำกัด" [level=5] [ref=f3e554]
                      - treeitem [ref=f3e555]:
                        - generic [ref=f3e564]:
                          - generic:
                            - generic:
                              - checkbox "50 ไฮ-ควอลิตี้ ทรานสปอร์ต" [disabled]
                          - heading "50 ไฮ-ควอลิตี้ ทรานสปอร์ต" [level=5] [ref=f3e566]
                - treeitem [expanded] [ref=f3e567]:
                  - generic [ref=f3e576]:
                    - generic:
                      - generic:
                        - checkbox "<img src=x onerror=alert(111)>" [disabled]
                    - heading "<img src=x onerror=alert(111)>" [level=5] [ref=f3e578]
                  - group [ref=f3e580]:
                    - treeitem [expanded] [ref=f3e583]:
                      - generic [ref=f3e592]:
                        - generic:
                          - generic:
                            - checkbox "DOM1 Huamark" [disabled]
                        - heading "DOM1 Huamark" [level=5] [ref=f3e594]
                      - group [ref=f3e596]:
                        - generic [ref=f3e598]:
                          - treeitem [expanded] [ref=f3e599]:
                            - generic [ref=f3e608]:
                              - generic:
                                - generic:
                                  - checkbox "DRM1" [disabled]
                              - heading "DRM1" [level=5] [ref=f3e610]
                            - group [ref=f3e612]:
                              - generic [ref=f3e614]:
                                - treeitem [ref=f3e615]:
                                  - generic [ref=f3e624]:
                                    - generic:
                                      - generic:
                                        - checkbox "DRM1_1" [disabled]
                                    - heading "DRM1_1" [level=5] [ref=f3e626]
                                - treeitem [ref=f3e627]:
                                  - generic [ref=f3e636]:
                                    - generic:
                                      - generic:
                                        - checkbox "DRM1_2" [disabled]
                                    - heading "DRM1_2" [level=5] [ref=f3e638]
                          - treeitem [expanded] [ref=f3e639]:
                            - generic [ref=f3e648]:
                              - generic:
                                - generic:
                                  - checkbox "DRM2" [disabled]
                              - heading "DRM2" [level=5] [ref=f3e650]
                            - group [ref=f3e652]:
                              - generic [ref=f3e654]:
                                - treeitem [ref=f3e655]:
                                  - generic [ref=f3e664]:
                                    - generic:
                                      - generic:
                                        - checkbox "DRM2_1" [disabled]
                                    - heading "DRM2_1" [level=5] [ref=f3e666]
                                - treeitem [ref=f3e667]:
                                  - generic [ref=f3e676]:
                                    - generic:
                                      - generic:
                                        - checkbox "DRM2_2" [disabled]
                                    - heading "DRM2_2" [level=5] [ref=f3e678]
                - treeitem [ref=f3e679]:
                  - generic [ref=f3e688]:
                    - generic:
                      - generic:
                        - checkbox "900 บริษัท ทดสอบ จำกัด" [disabled]
                    - heading "900 บริษัท ทดสอบ จำกัด" [level=5] [ref=f3e690]
                - treeitem [expanded] [ref=f3e691]:
                  - generic [ref=f3e700]:
                    - generic:
                      - generic:
                        - checkbox "AGG UAT" [disabled]
                    - heading "AGG UAT" [level=5] [ref=f3e702]
                  - group [ref=f3e704]:
                    - generic [ref=f3e706]:
                      - treeitem [ref=f3e707]:
                        - generic [ref=f3e716]:
                          - generic:
                            - generic:
                              - checkbox "111" [disabled]
                          - heading "111" [level=5] [ref=f3e718]
                      - treeitem [ref=f3e719]:
                        - generic [ref=f3e728]:
                          - generic:
                            - generic:
                              - checkbox "aaa" [disabled]
                          - heading "aaa" [level=5] [ref=f3e730]
                      - treeitem [ref=f3e731]:
                        - generic [ref=f3e740]:
                          - generic:
                            - generic:
                              - checkbox "ASON" [disabled]
                          - heading "ASON" [level=5] [ref=f3e742]
                      - treeitem [ref=f3e743]:
                        - generic [ref=f3e752]:
                          - generic:
                            - generic:
                              - checkbox "donbu" [disabled]
                          - heading "donbu" [level=5] [ref=f3e754]
                      - treeitem [expanded] [ref=f3e755]:
                        - generic [ref=f3e764]:
                          - generic:
                            - generic:
                              - checkbox "eed" [disabled]
                          - heading "eed" [level=5] [ref=f3e766]
                        - group [ref=f3e768]:
                          - treeitem [ref=f3e771]:
                            - generic [ref=f3e780]:
                              - generic:
                                - generic:
                                  - checkbox "eed3" [disabled]
                              - heading "eed3" [level=5] [ref=f3e782]
                      - treeitem [ref=f3e783]:
                        - generic [ref=f3e792]:
                          - generic:
                            - generic:
                              - checkbox "MKC" [disabled]
                          - heading "MKC" [level=5] [ref=f3e794]
                      - treeitem [ref=f3e795]:
                        - generic [ref=f3e804]:
                          - generic:
                            - generic:
                              - checkbox "MPC" [disabled]
                          - heading "MPC" [level=5] [ref=f3e806]
                      - treeitem [ref=f3e807]:
                        - generic [ref=f3e816]:
                          - generic:
                            - generic:
                              - checkbox "test bug from mail" [disabled]
                          - heading "test bug from mail" [level=5] [ref=f3e818]
                      - treeitem [ref=f3e819]:
                        - generic [ref=f3e828]:
                          - generic:
                            - generic:
                              - checkbox "test bug from mail2" [disabled]
                          - heading "test bug from mail2" [level=5] [ref=f3e830]
                      - treeitem [ref=f3e831]:
                        - generic [ref=f3e840]:
                          - generic:
                            - generic:
                              - checkbox "test bug from mail3" [disabled]
                          - heading "test bug from mail3" [level=5] [ref=f3e842]
                      - treeitem [ref=f3e843]:
                        - generic [ref=f3e852]:
                          - generic:
                            - generic:
                              - checkbox "xx" [disabled]
                          - heading "xx" [level=5] [ref=f3e854]
                      - treeitem [ref=f3e855]:
                        - generic [ref=f3e864]:
                          - generic:
                            - generic:
                              - checkbox "รัตนมงคลบางปะอินขนส่ง" [disabled]
                          - heading "รัตนมงคลบางปะอินขนส่ง" [level=5] [ref=f3e866]
                      - treeitem [ref=f3e867]:
                        - generic [ref=f3e876]:
                          - generic:
                            - generic:
                              - checkbox "สยามโลจิสติกส์ จำกัด" [disabled]
                          - heading "สยามโลจิสติกส์ จำกัด" [level=5] [ref=f3e878]
                - treeitem [ref=f3e879]:
                  - generic [ref=f3e888]:
                    - generic:
                      - generic:
                        - checkbox "block" [disabled]
                    - heading "block" [level=5] [ref=f3e890]
                - treeitem [ref=f3e891]:
                  - generic [ref=f3e900]:
                    - generic:
                      - generic:
                        - checkbox "BU ยาววววววววววววววววววววสุดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดด สำหรับเทส" [disabled]
                    - heading "BU ยาววววววววววววววววววววสุดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดดด สำหรับเทส" [level=5] [ref=f3e902]
                - treeitem [ref=f3e903]:
                  - generic [ref=f3e912]:
                    - generic:
                      - generic:
                        - checkbox "Cook" [disabled]
                    - heading "Cook" [level=5] [ref=f3e914]
                - treeitem [expanded] [ref=f3e915]:
                  - generic [ref=f3e924]:
                    - generic:
                      - generic:
                        - checkbox "D01" [disabled]
                    - heading "D01" [level=5] [ref=f3e926]
                  - group [ref=f3e928]:
                    - treeitem [expanded] [ref=f3e931]:
                      - generic [ref=f3e940]:
                        - generic:
                          - generic:
                            - checkbox "D02" [disabled]
                        - heading "D02" [level=5] [ref=f3e942]
                      - group [ref=f3e944]:
                        - treeitem [ref=f3e947]:
                          - generic [ref=f3e956]:
                            - generic:
                              - generic:
                                - checkbox "D03" [disabled]
                            - heading "D03" [level=5] [ref=f3e958]
                - treeitem [ref=f3e959]:
                  - generic [ref=f3e968]:
                    - generic:
                      - generic:
                        - checkbox "DA2" [disabled]
                    - heading "DA2" [level=5] [ref=f3e970]
                - treeitem [expanded] [ref=f3e971]:
                  - generic [ref=f3e980]:
                    - generic:
                      - generic:
                        - checkbox "DHAS - Ownfleet" [disabled]
                    - heading "DHAS - Ownfleet" [level=5] [ref=f3e982]
                  - group [ref=f3e984]:
                    - treeitem [ref=f3e987]:
                      - generic [ref=f3e996]:
                        - generic:
                          - generic:
                            - checkbox "DHA" [disabled]
                        - heading "DHA" [level=5] [ref=f3e998]
                - treeitem [expanded] [ref=f3e999]:
                  - generic [ref=f3e1008]:
                    - generic:
                      - generic:
                        - checkbox "DHAS - SubContract" [disabled]
                    - heading "DHAS - SubContract" [level=5] [ref=f3e1010]
                  - group [ref=f3e1012]:
                    - treeitem [ref=f3e1015]:
                      - generic [ref=f3e1024]:
                        - generic:
                          - generic:
                            - checkbox "ตากู๋ ทรานสปอร์ต 2014" [disabled]
                        - heading "ตากู๋ ทรานสปอร์ต 2014" [level=5] [ref=f3e1026]
                - treeitem [expanded] [ref=f3e1027]:
                  - generic [ref=f3e1036]:
                    - generic:
                      - generic:
                        - checkbox "DOH Level 1" [disabled]
                    - heading "DOH Level 1" [level=5] [ref=f3e1038]
                  - group [ref=f3e1040]:
                    - treeitem [expanded] [ref=f3e1043]:
                      - generic [ref=f3e1052]:
                        - generic:
                          - generic:
                            - checkbox "DOH Level 2" [disabled]
                        - heading "DOH Level 2" [level=5] [ref=f3e1054]
                      - group [ref=f3e1056]:
                        - generic [ref=f3e1058]:
                          - treeitem [ref=f3e1059]:
                            - generic [ref=f3e1068]:
                              - generic:
                                - generic:
                                  - checkbox "DL04" [disabled]
                              - heading "DL04" [level=5] [ref=f3e1070]
                          - treeitem [expanded] [ref=f3e1071]:
                            - generic [ref=f3e1080]:
                              - generic:
                                - generic:
                                  - checkbox "DOH Level 3" [disabled]
                              - heading "DOH Level 3" [level=5] [ref=f3e1082]
                            - group [ref=f3e1084]:
                              - treeitem [ref=f3e1087]:
                                - generic [ref=f3e1096]:
                                  - generic:
                                    - generic:
                                      - checkbox "30 โรงงานน้ำตาลและอ้อยตะวันออก" [disabled]
                                  - heading "30 โรงงานน้ำตาลและอ้อยตะวันออก" [level=5] [ref=f3e1098]
                - treeitem [expanded] [ref=f3e1099]:
                  - generic [ref=f3e1108]:
                    - generic:
                      - generic:
                        - checkbox "Dream Transport" [disabled]
                    - heading "Dream Transport" [level=5] [ref=f3e1110]
                  - group [ref=f3e1112]:
                    - treeitem [expanded] [ref=f3e1115]:
                      - generic [ref=f3e1124]:
                        - generic:
                          - generic:
                            - checkbox "Dream Transport01" [disabled]
                        - heading "Dream Transport01" [level=5] [ref=f3e1126]
                      - group [ref=f3e1128]:
                        - treeitem [ref=f3e1131]:
                          - generic [ref=f3e1140]:
                            - generic:
                              - generic:
                                - checkbox "Dream Transport02" [disabled]
                            - heading "Dream Transport02" [level=5] [ref=f3e1142]
                - treeitem [ref=f3e1143]:
                  - generic [ref=f3e1152]:
                    - generic:
                      - generic:
                        - checkbox "Dummy" [disabled]
                    - heading "Dummy" [level=5] [ref=f3e1154]
                - treeitem [expanded] [ref=f3e1155]:
                  - generic [ref=f3e1164]:
                    - generic:
                      - generic:
                        - checkbox "duplicate" [disabled]
                    - heading "duplicate" [level=5] [ref=f3e1166]
                  - group [ref=f3e1168]:
                    - treeitem [ref=f3e1171]:
                      - generic [ref=f3e1180]:
                        - generic:
                          - generic:
                            - checkbox "duplicate01" [disabled]
                        - heading "duplicate01" [level=5] [ref=f3e1182]
                - treeitem [expanded] [ref=f3e1183]:
                  - generic [ref=f3e1192]:
                    - generic:
                      - generic:
                        - checkbox "Eit Test" [disabled]
                    - heading "Eit Test" [level=5] [ref=f3e1194]
                  - group [ref=f3e1196]:
                    - generic [ref=f3e1198]:
                      - treeitem [ref=f3e1199]:
                        - generic [ref=f3e1208]:
                          - generic:
                            - generic:
                              - checkbox "Shipment" [disabled]
                          - heading "Shipment" [level=5] [ref=f3e1210]
                      - treeitem [ref=f3e1211]:
                        - generic [ref=f3e1220]:
                          - generic:
                            - generic:
                              - checkbox "Test MMS (Approval Flow)" [disabled]
                          - heading "Test MMS (Approval Flow)" [level=5] [ref=f3e1222]
                      - treeitem [ref=f3e1223]:
                        - generic [ref=f3e1232]:
                          - generic:
                            - generic:
                              - checkbox "Test TripCost - Revenue" [disabled]
                          - heading "Test TripCost - Revenue" [level=5] [ref=f3e1234]
                - treeitem [expanded] [ref=f3e1235]:
                  - generic [ref=f3e1244]:
                    - generic:
                      - generic:
                        - checkbox "Happy Transport" [disabled]
                    - heading "Happy Transport" [level=5] [ref=f3e1246]
                  - group [ref=f3e1248]:
                    - generic [ref=f3e1250]:
                      - treeitem [expanded] [ref=f3e1251]:
                        - generic [ref=f3e1260]:
                          - generic:
                            - generic:
                              - checkbox "Happy Transport 001" [disabled]
                          - heading "Happy Transport 001" [level=5] [ref=f3e1262]
                        - group [ref=f3e1264]:
                          - generic [ref=f3e1266]:
                            - treeitem [ref=f3e1267]:
                              - generic [ref=f3e1276]:
                                - generic:
                                  - generic:
                                    - checkbox "Happy Transport 003" [disabled]
                                - heading "Happy Transport 003" [level=5] [ref=f3e1278]
                            - treeitem [expanded] [ref=f3e1279]:
                              - generic [ref=f3e1288]:
                                - generic:
                                  - generic:
                                    - checkbox "Happy Transport 004" [disabled]
                                - heading "Happy Transport 004" [level=5] [ref=f3e1290]
                              - group [ref=f3e1292]:
                                - treeitem [ref=f3e1295]:
                                  - generic [ref=f3e1304]:
                                    - generic:
                                      - generic:
                                        - checkbox "Happy Transport 005" [disabled]
                                    - heading "Happy Transport 005" [level=5] [ref=f3e1306]
                            - treeitem [ref=f3e1307]:
                              - generic [ref=f3e1316]:
                                - generic:
                                  - generic:
                                    - checkbox "Test001" [disabled]
                                - heading "Test001" [level=5] [ref=f3e1318]
                      - treeitem [ref=f3e1319]:
                        - generic [ref=f3e1328]:
                          - generic:
                            - generic:
                              - checkbox "Happy Transport 1" [disabled]
                          - heading "Happy Transport 1" [level=5] [ref=f3e1330]
                - treeitem [ref=f3e1331]:
                  - generic [ref=f3e1340]:
                    - generic:
                      - generic:
                        - checkbox "HONDA01" [disabled]
                    - heading "HONDA01" [level=5] [ref=f3e1342]
                - treeitem [ref=f3e1343]:
                  - generic [ref=f3e1352]:
                    - generic:
                      - generic:
                        - checkbox "HONDA02" [disabled]
                    - heading "HONDA02" [level=5] [ref=f3e1354]
                - treeitem [ref=f3e1355]:
                  - generic [ref=f3e1364]:
                    - generic:
                      - generic:
                        - checkbox "HONDA03" [disabled]
                    - heading "HONDA03" [level=5] [ref=f3e1366]
                - treeitem [expanded] [ref=f3e1367]:
                  - generic [ref=f3e1376]:
                    - generic:
                      - generic:
                        - checkbox "HZ" [disabled]
                    - heading "HZ" [level=5] [ref=f3e1378]
                  - group [ref=f3e1380]:
                    - generic [ref=f3e1382]:
                      - treeitem [expanded] [ref=f3e1383]:
                        - generic [ref=f3e1392]:
                          - generic:
                            - generic:
                              - checkbox "A" [disabled]
                          - heading "A" [level=5] [ref=f3e1394]
                        - group [ref=f3e1396]:
                          - treeitem [ref=f3e1399]:
                            - generic [ref=f3e1408]:
                              - generic:
                                - generic:
                                  - checkbox "C" [disabled]
                              - heading "C" [level=5] [ref=f3e1410]
                      - treeitem [expanded] [ref=f3e1411]:
                        - generic [ref=f3e1420]:
                          - generic:
                            - generic:
                              - checkbox "B" [disabled]
                          - heading "B" [level=5] [ref=f3e1422]
                        - group [ref=f3e1424]:
                          - treeitem [ref=f3e1427]:
                            - generic [ref=f3e1436]:
                              - generic:
                                - generic:
                                  - checkbox "C" [disabled]
                              - heading "C" [level=5] [ref=f3e1438]
                - treeitem [expanded] [ref=f3e1439]:
                  - generic [ref=f3e1448]:
                    - generic:
                      - generic:
                        - checkbox "ISUZU สำโรง" [disabled]
                    - heading "ISUZU สำโรง" [level=5] [ref=f3e1450]
                  - group [ref=f3e1452]:
                    - generic [ref=f3e1454]:
                      - treeitem [ref=f3e1455]:
                        - generic [ref=f3e1464]:
                          - generic:
                            - generic:
                              - checkbox "SUB1" [disabled]
                          - heading "SUB1" [level=5] [ref=f3e1466]
                      - treeitem [ref=f3e1467]:
                        - generic [ref=f3e1476]:
                          - generic:
                            - generic:
                              - checkbox "SUB2" [disabled]
                          - heading "SUB2" [level=5] [ref=f3e1478]
                      - treeitem [ref=f3e1479]:
                        - generic [ref=f3e1488]:
                          - generic:
                            - generic:
                              - checkbox "SUB3" [disabled]
                          - heading "SUB3" [level=5] [ref=f3e1490]
                - treeitem [expanded] [ref=f3e1491]:
                  - generic [ref=f3e1500]:
                    - generic:
                      - generic:
                        - checkbox "Logistics Alliance" [disabled]
                    - heading "Logistics Alliance" [level=5] [ref=f3e1502]
                  - group [ref=f3e1504]:
                    - generic [ref=f3e1506]:
                      - treeitem [ref=f3e1507]:
                        - generic [ref=f3e1516]:
                          - generic:
                            - generic:
                              - checkbox "Fix" [disabled]
                          - heading "Fix" [level=5] [ref=f3e1518]
                      - treeitem [ref=f3e1519]:
                        - generic [ref=f3e1528]:
                          - generic:
                            - generic:
                              - checkbox "Flex" [disabled]
                          - heading "Flex" [level=5] [ref=f3e1530]
                - treeitem [ref=f3e1531]:
                  - generic [ref=f3e1540]:
                    - generic:
                      - generic:
                        - checkbox "M & N" [disabled]
                    - heading "M & N" [level=5] [ref=f3e1542]
                - treeitem [expanded] [ref=f3e1543]:
                  - generic [ref=f3e1552]:
                    - generic:
                      - generic:
                        - checkbox "NFT" [disabled]
                    - heading "NFT" [level=5] [ref=f3e1554]
                  - group [ref=f3e1556]:
                    - treeitem [ref=f3e1559]:
                      - generic [ref=f3e1568]:
                        - generic:
                          - generic:
                            - checkbox "NFT001" [disabled]
                        - heading "NFT001" [level=5] [ref=f3e1570]
                - treeitem [ref=f3e1571]:
                  - generic [ref=f3e1580]:
                    - generic:
                      - generic:
                        - checkbox "Nippon" [disabled]
                    - heading "Nippon" [level=5] [ref=f3e1582]
                - treeitem [ref=f3e1583]:
                  - generic [ref=f3e1592]:
                    - generic:
                      - generic:
                        - checkbox "NoReference" [disabled]
                    - heading "NoReference" [level=5] [ref=f3e1594]
                - treeitem [ref=f3e1595]:
                  - generic [ref=f3e1604]:
                    - generic:
                      - generic:
                        - checkbox "NOSTRA LOGISTICS" [disabled]
                    - heading "NOSTRA LOGISTICS" [level=5] [ref=f3e1606]
                - treeitem [expanded] [ref=f3e1607]:
                  - generic [ref=f3e1616]:
                    - generic:
                      - generic:
                        - checkbox "NoyNoy" [disabled]
                    - heading "NoyNoy" [level=5] [ref=f3e1618]
                  - group [ref=f3e1620]:
                    - treeitem [expanded] [ref=f3e1623]:
                      - generic [ref=f3e1632]:
                        - generic:
                          - generic:
                            - checkbox "NoyNoy 1" [disabled]
                        - heading "NoyNoy 1" [level=5] [ref=f3e1634]
                      - group [ref=f3e1636]:
                        - treeitem [ref=f3e1639]:
                          - generic [ref=f3e1648]:
                            - generic:
                              - generic:
                                - checkbox "NoyNoy 2" [disabled]
                            - heading "NoyNoy 2" [level=5] [ref=f3e1650]
                - treeitem [expanded] [ref=f3e1651]:
                  - generic [ref=f3e1660]:
                    - generic:
                      - generic:
                        - checkbox "pass" [disabled]
                    - heading "pass" [level=5] [ref=f3e1662]
                  - group [ref=f3e1664]:
                    - treeitem [ref=f3e1667]:
                      - generic [ref=f3e1676]:
                        - generic:
                          - generic:
                            - checkbox "pass2" [disabled]
                        - heading "pass2" [level=5] [ref=f3e1678]
                - treeitem [expanded] [ref=f3e1679]:
                  - generic [ref=f3e1688]:
                    - generic:
                      - generic:
                        - checkbox "pass3" [disabled]
                    - heading "pass3" [level=5] [ref=f3e1690]
                  - group [ref=f3e1692]:
                    - treeitem [ref=f3e1695]:
                      - generic [ref=f3e1704]:
                        - generic:
                          - generic:
                            - checkbox "pass03" [disabled]
                        - heading "pass03" [level=5] [ref=f3e1706]
                - treeitem [expanded] [ref=f3e1707]:
                  - generic [ref=f3e1716]:
                    - generic:
                      - generic:
                        - checkbox "Plant 001" [disabled]
                    - heading "Plant 001" [level=5] [ref=f3e1718]
                  - group [ref=f3e1720]:
                    - treeitem [ref=f3e1723]:
                      - generic [ref=f3e1732]:
                        - generic:
                          - generic:
                            - checkbox "Transporter 001" [disabled]
                        - heading "Transporter 001" [level=5] [ref=f3e1734]
                - treeitem [expanded] [ref=f3e1735]:
                  - generic [ref=f3e1744]:
                    - generic:
                      - generic:
                        - checkbox "Plant 002" [disabled]
                    - heading "Plant 002" [level=5] [ref=f3e1746]
                  - group [ref=f3e1748]:
                    - treeitem [ref=f3e1751]:
                      - generic [ref=f3e1760]:
                        - generic:
                          - generic:
                            - checkbox "Transporter 002" [disabled]
                        - heading "Transporter 002" [level=5] [ref=f3e1762]
                - treeitem [ref=f3e1763]:
                  - generic [ref=f3e1772]:
                    - generic:
                      - generic:
                        - checkbox "ReferenceCodeAll" [disabled]
                    - heading "ReferenceCodeAll" [level=5] [ref=f3e1774]
                - treeitem [ref=f3e1775]:
                  - generic [ref=f3e1784]:
                    - generic:
                      - generic:
                        - checkbox "Relocate" [disabled]
                    - heading "Relocate" [level=5] [ref=f3e1786]
                - treeitem [expanded] [ref=f3e1787]:
                  - generic [ref=f3e1796]:
                    - generic:
                      - generic:
                        - checkbox "SCCC" [disabled]
                    - heading "SCCC" [level=5] [ref=f3e1798]
                  - group [ref=f3e1800]:
                    - generic [ref=f3e1802]:
                      - treeitem [ref=f3e1803]:
                        - generic [ref=f3e1812]:
                          - generic:
                            - generic:
                              - checkbox "3 เอ็น ทรานสปอร์ต" [disabled]
                          - heading "3 เอ็น ทรานสปอร์ต" [level=5] [ref=f3e1814]
                      - treeitem [ref=f3e1815]:
                        - generic [ref=f3e1824]:
                          - generic:
                            - generic:
                              - checkbox "KGJ CEMENT II AS" [disabled]
                          - heading "KGJ CEMENT II AS" [level=5] [ref=f3e1826]
                      - treeitem [expanded] [ref=f3e1827]:
                        - generic [ref=f3e1836]:
                          - generic:
                            - generic:
                              - checkbox "Level1" [disabled]
                          - heading "Level1" [level=5] [ref=f3e1838]
                        - group [ref=f3e1840]:
                          - treeitem [expanded] [ref=f3e1843]:
                            - generic [ref=f3e1852]:
                              - generic:
                                - generic:
                                  - checkbox "Level2" [disabled]
                              - heading "Level2" [level=5] [ref=f3e1854]
                            - group [ref=f3e1856]:
                              - treeitem [expanded] [ref=f3e1859]:
                                - generic [ref=f3e1868]:
                                  - generic:
                                    - generic:
                                      - checkbox "Level3" [disabled]
                                  - heading "Level3" [level=5] [ref=f3e1870]
                                - group [ref=f3e1872]:
                                  - generic [ref=f3e1874]:
                                    - treeitem [ref=f3e1875]:
                                      - generic [ref=f3e1884]:
                                        - generic:
                                          - generic:
                                            - checkbox "Level4:Branch1" [disabled]
                                        - heading "Level4:Branch1" [level=5] [ref=f3e1886]
                                    - treeitem [expanded] [ref=f3e1887]:
                                      - generic [ref=f3e1896]:
                                        - generic:
                                          - generic:
                                            - checkbox "Level4:Branch2" [disabled]
                                        - heading "Level4:Branch2" [level=5] [ref=f3e1898]
                                      - group [ref=f3e1900]:
                                        - treeitem [ref=f3e1903]:
                                          - generic [ref=f3e1912]:
                                            - generic:
                                              - generic:
                                                - checkbox "Level5" [disabled]
                                            - heading "Level5" [level=5] [ref=f3e1914]
                      - treeitem [ref=f3e1915]:
                        - generic [ref=f3e1924]:
                          - generic:
                            - generic:
                              - checkbox "กฤษณะพรวัฒนา" [disabled]
                          - heading "กฤษณะพรวัฒนา" [level=5] [ref=f3e1926]
                      - treeitem [ref=f3e1927]:
                        - generic [ref=f3e1936]:
                          - generic:
                            - generic:
                              - checkbox "กวีกิจ โลจิสติกส์" [disabled]
                          - heading "กวีกิจ โลจิสติกส์" [level=5] [ref=f3e1938]
                      - treeitem [ref=f3e1939]:
                        - generic [ref=f3e1948]:
                          - generic:
                            - generic:
                              - checkbox "กิจเจริญทรานสปอร์ท" [disabled]
                          - heading "กิจเจริญทรานสปอร์ท" [level=5] [ref=f3e1950]
                      - treeitem [ref=f3e1951]:
                        - generic [ref=f3e1960]:
                          - generic:
                            - generic:
                              - checkbox "เค.เอ็น.อาร์.กรุ๊ฟ" [disabled]
                          - heading "เค.เอ็น.อาร์.กรุ๊ฟ" [level=5] [ref=f3e1962]
                      - treeitem [ref=f3e1963]:
                        - generic [ref=f3e1972]:
                          - generic:
                            - generic:
                              - checkbox "จัสท์ อิน ไทม์ เอ็กซ์เพรส" [disabled]
                          - heading "จัสท์ อิน ไทม์ เอ็กซ์เพรส" [level=5] [ref=f3e1974]
                      - treeitem [ref=f3e1975]:
                        - generic [ref=f3e1984]:
                          - generic:
                            - generic:
                              - checkbox "ชัยยันต์ คอนกรีต จำกัด" [disabled]
                          - heading "ชัยยันต์ คอนกรีต จำกัด" [level=5] [ref=f3e1986]
                      - treeitem [ref=f3e1987]:
                        - generic [ref=f3e1996]:
                          - generic:
                            - generic:
                              - checkbox "โชติวัฒน์อินเตอร์เทรด แอนด์ ทรานสปอร์ต" [disabled]
                          - heading "โชติวัฒน์อินเตอร์เทรด แอนด์ ทรานสปอร์ต" [level=5] [ref=f3e1998]
                      - treeitem [ref=f3e1999]:
                        - generic [ref=f3e2008]:
                          - generic:
                            - generic:
                              - checkbox "ไชยรุ่งเรืองขนส่ง" [disabled]
                          - heading "ไชยรุ่งเรืองขนส่ง" [level=5] [ref=f3e2010]
                      - treeitem [ref=f3e2011]:
                        - generic [ref=f3e2020]:
                          - generic:
                            - generic:
                              - checkbox "ด่านขุนทดกิจไพศาล" [disabled]
                          - heading "ด่านขุนทดกิจไพศาล" [level=5] [ref=f3e2022]
                      - treeitem [ref=f3e2023]:
                        - generic [ref=f3e2032]:
                          - generic:
                            - generic:
                              - checkbox "ดาวบูรพา เซอร์วิส" [disabled]
                          - heading "ดาวบูรพา เซอร์วิส" [level=5] [ref=f3e2034]
                      - treeitem [ref=f3e2035]:
                        - generic [ref=f3e2044]:
                          - generic:
                            - generic:
                              - checkbox "เตียวสมบูรณ์กิจ ทรานสปอร์ต" [disabled]
                          - heading "เตียวสมบูรณ์กิจ ทรานสปอร์ต" [level=5] [ref=f3e2046]
                      - treeitem [ref=f3e2047]:
                        - generic [ref=f3e2056]:
                          - generic:
                            - generic:
                              - checkbox "ทอปมารีน" [disabled]
                          - heading "ทอปมารีน" [level=5] [ref=f3e2058]
                      - treeitem [ref=f3e2059]:
                        - generic [ref=f3e2068]:
                          - generic:
                            - generic:
                              - checkbox "ทอปมารีน & ส.ภัทรวดี" [disabled]
                          - heading "ทอปมารีน & ส.ภัทรวดี" [level=5] [ref=f3e2070]
                      - treeitem [ref=f3e2071]:
                        - generic [ref=f3e2080]:
                          - generic:
                            - generic:
                              - checkbox "เทพประดิษฐ์" [disabled]
                          - heading "เทพประดิษฐ์" [level=5] [ref=f3e2082]
                      - treeitem [ref=f3e2083]:
                        - generic [ref=f3e2092]:
                          - generic:
                            - generic:
                              - checkbox "ธนวัช รัตนมงคล" [disabled]
                          - heading "ธนวัช รัตนมงคล" [level=5] [ref=f3e2094]
                      - treeitem [ref=f3e2095]:
                        - generic [ref=f3e2104]:
                          - generic:
                            - generic:
                              - checkbox "ธนวัช รัตนมงคล & บีเอชแอล โททอล" [disabled]
                          - heading "ธนวัช รัตนมงคล & บีเอชแอล โททอล" [level=5] [ref=f3e2106]
                      - treeitem [ref=f3e2107]:
                        - generic [ref=f3e2116]:
                          - generic:
                            - generic:
                              - checkbox "ธนวัช รัตนมงคล & เอสวีแอล" [disabled]
                          - heading "ธนวัช รัตนมงคล & เอสวีแอล" [level=5] [ref=f3e2118]
                      - treeitem [ref=f3e2119]:
                        - generic [ref=f3e2128]:
                          - generic:
                            - generic:
                              - checkbox "ธารสุวรรณ" [disabled]
                          - heading "ธารสุวรรณ" [level=5] [ref=f3e2130]
                      - treeitem [ref=f3e2131]:
                        - generic [ref=f3e2140]:
                          - generic:
                            - generic:
                              - checkbox "โน๊ตน้องแนน ทรานสปอร์ต" [disabled]
                          - heading "โน๊ตน้องแนน ทรานสปอร์ต" [level=5] [ref=f3e2142]
                      - treeitem [ref=f3e2143]:
                        - generic [ref=f3e2152]:
                          - generic:
                            - generic:
                              - checkbox "บิ๊กโฮม ทรานสปอร์ต" [disabled]
                          - heading "บิ๊กโฮม ทรานสปอร์ต" [level=5] [ref=f3e2154]
                      - treeitem [ref=f3e2155]:
                        - generic [ref=f3e2164]:
                          - generic:
                            - generic:
                              - checkbox "บีทีแอล & ภัทร-นครหลวง" [disabled]
                          - heading "บีทีแอล & ภัทร-นครหลวง" [level=5] [ref=f3e2166]
                      - treeitem [ref=f3e2167]:
                        - generic [ref=f3e2176]:
                          - generic:
                            - generic:
                              - checkbox "บีทีแอล ลอจิสติกส์" [disabled]
                          - heading "บีทีแอล ลอจิสติกส์" [level=5] [ref=f3e2178]
                      - treeitem [ref=f3e2179]:
                        - generic [ref=f3e2188]:
                          - generic:
                            - generic:
                              - checkbox "บีเอชแอล & ภัทรทรานสปอร์ต" [disabled]
                          - heading "บีเอชแอล & ภัทรทรานสปอร์ต" [level=5] [ref=f3e2190]
                      - treeitem [ref=f3e2191]:
                        - generic [ref=f3e2200]:
                          - generic:
                            - generic:
                              - checkbox "บีเอชแอล & ภัทร-นครหลวง" [disabled]
                          - heading "บีเอชแอล & ภัทร-นครหลวง" [level=5] [ref=f3e2202]
                      - treeitem [ref=f3e2203]:
                        - generic [ref=f3e2212]:
                          - generic:
                            - generic:
                              - checkbox "บีเอชแอล & มีนาทรานสปอร์ต" [disabled]
                          - heading "บีเอชแอล & มีนาทรานสปอร์ต" [level=5] [ref=f3e2214]
                      - treeitem [ref=f3e2215]:
                        - generic [ref=f3e2224]:
                          - generic:
                            - generic:
                              - checkbox "บีเอชแอล โททอล โลจิสติกส์" [disabled]
                          - heading "บีเอชแอล โททอล โลจิสติกส์" [level=5] [ref=f3e2226]
                      - treeitem [ref=f3e2227]:
                        - generic [ref=f3e2236]:
                          - generic:
                            - generic:
                              - checkbox "บุญญกิจร่วมบริการ" [disabled]
                          - heading "บุญญกิจร่วมบริการ" [level=5] [ref=f3e2238]
                      - treeitem [ref=f3e2239]:
                        - generic [ref=f3e2248]:
                          - generic:
                            - generic:
                              - checkbox "บุญญกิจร่วมบริการ & สุนทรพัทลุง" [disabled]
                          - heading "บุญญกิจร่วมบริการ & สุนทรพัทลุง" [level=5] [ref=f3e2250]
                      - treeitem [ref=f3e2251]:
                        - generic [ref=f3e2260]:
                          - generic:
                            - generic:
                              - checkbox "บุญญฤทธิ์ ทรานสปอร์ต" [disabled]
                          - heading "บุญญฤทธิ์ ทรานสปอร์ต" [level=5] [ref=f3e2262]
                      - treeitem [ref=f3e2263]:
                        - generic [ref=f3e2272]:
                          - generic:
                            - generic:
                              - checkbox "ประสบสุขโลจิสติกส์ไทย" [disabled]
                          - heading "ประสบสุขโลจิสติกส์ไทย" [level=5] [ref=f3e2274]
                      - treeitem [ref=f3e2275]:
                        - generic [ref=f3e2284]:
                          - generic:
                            - generic:
                              - checkbox "พลทรัพย์ โลจิสติกส์" [disabled]
                          - heading "พลทรัพย์ โลจิสติกส์" [level=5] [ref=f3e2286]
                      - treeitem [ref=f3e2287]:
                        - generic [ref=f3e2296]:
                          - generic:
                            - generic:
                              - checkbox "พัชรพันธ์ ขนส่ง" [disabled]
                          - heading "พัชรพันธ์ ขนส่ง" [level=5] [ref=f3e2298]
                      - treeitem [ref=f3e2299]:
                        - generic [ref=f3e2308]:
                          - generic:
                            - generic:
                              - checkbox "พี เค สแครปแอนด์รีไซเคิล เซอร์วิส" [disabled]
                          - heading "พี เค สแครปแอนด์รีไซเคิล เซอร์วิส" [level=5] [ref=f3e2310]
                      - treeitem [ref=f3e2311]:
                        - generic [ref=f3e2320]:
                          - generic:
                            - generic:
                              - checkbox "พี.ซี.ปิโตรเลียมแอนด์เทอร์มินอล" [disabled]
                          - heading "พี.ซี.ปิโตรเลียมแอนด์เทอร์มินอล" [level=5] [ref=f3e2322]
                      - treeitem [ref=f3e2323]:
                        - generic [ref=f3e2332]:
                          - generic:
                            - generic:
                              - checkbox "พี.ซี.ปิโตรเลียมแอนด์เทอร์มินอล & เรือลำเลียงไทยและบริการ" [disabled]
                          - heading "พี.ซี.ปิโตรเลียมแอนด์เทอร์มินอล & เรือลำเลียงไทยและบริการ" [level=5] [ref=f3e2334]
                      - treeitem [ref=f3e2335]:
                        - generic [ref=f3e2344]:
                          - generic:
                            - generic:
                              - checkbox "ภัทรทรานสปอร์ต" [disabled]
                          - heading "ภัทรทรานสปอร์ต" [level=5] [ref=f3e2346]
                      - treeitem [ref=f3e2347]:
                        - generic [ref=f3e2356]:
                          - generic:
                            - generic:
                              - checkbox "ภัทร-นครหลวง" [disabled]
                          - heading "ภัทร-นครหลวง" [level=5] [ref=f3e2358]
                      - treeitem [ref=f3e2359]:
                        - generic [ref=f3e2368]:
                          - generic:
                            - generic:
                              - checkbox "ภัทร-นครหลวง & ศรีวิชัยนาวี" [disabled]
                          - heading "ภัทร-นครหลวง & ศรีวิชัยนาวี" [level=5] [ref=f3e2370]
                      - treeitem [ref=f3e2371]:
                        - generic [ref=f3e2380]:
                          - generic:
                            - generic:
                              - checkbox "มัณฑนาขนส่ง1999" [disabled]
                          - heading "มัณฑนาขนส่ง1999" [level=5] [ref=f3e2382]
                      - treeitem [ref=f3e2383]:
                        - generic [ref=f3e2392]:
                          - generic:
                            - generic:
                              - checkbox "มีนาทรานสปอร์ต" [disabled]
                          - heading "มีนาทรานสปอร์ต" [level=5] [ref=f3e2394]
                      - treeitem [ref=f3e2395]:
                        - generic [ref=f3e2404]:
                          - generic:
                            - generic:
                              - checkbox "รัตนมงคลบางปะอินขนส่ง" [disabled]
                          - heading "รัตนมงคลบางปะอินขนส่ง" [level=5] [ref=f3e2406]
                      - treeitem [ref=f3e2407]:
                        - generic [ref=f3e2416]:
                          - generic:
                            - generic:
                              - checkbox "รัตนมงคลบางปะอินขนส่ง & มัณฑนาขนส่ง1999" [disabled]
                          - heading "รัตนมงคลบางปะอินขนส่ง & มัณฑนาขนส่ง1999" [level=5] [ref=f3e2418]
                      - treeitem [ref=f3e2419]:
                        - generic [ref=f3e2428]:
                          - generic:
                            - generic:
                              - checkbox "รัตสถิตย์ กรุ๊ป" [disabled]
                          - heading "รัตสถิตย์ กรุ๊ป" [level=5] [ref=f3e2430]
                      - treeitem [ref=f3e2431]:
                        - generic [ref=f3e2440]:
                          - generic:
                            - generic:
                              - checkbox "ราชสีมาดราก้อน 2002" [disabled]
                          - heading "ราชสีมาดราก้อน 2002" [level=5] [ref=f3e2442]
                      - treeitem [ref=f3e2443]:
                        - generic [ref=f3e2452]:
                          - generic:
                            - generic:
                              - checkbox "เรือลำเลียง & ธารสุวรรณ" [disabled]
                          - heading "เรือลำเลียง & ธารสุวรรณ" [level=5] [ref=f3e2454]
                      - treeitem [ref=f3e2455]:
                        - generic [ref=f3e2464]:
                          - generic:
                            - generic:
                              - checkbox "เรือลำเลียงไทยและบริการ" [disabled]
                          - heading "เรือลำเลียงไทยและบริการ" [level=5] [ref=f3e2466]
                      - treeitem [ref=f3e2467]:
                        - generic [ref=f3e2476]:
                          - generic:
                            - generic:
                              - checkbox "ไลน์ ทรานสปอร์ต" [disabled]
                          - heading "ไลน์ ทรานสปอร์ต" [level=5] [ref=f3e2478]
                      - treeitem [ref=f3e2479]:
                        - generic [ref=f3e2488]:
                          - generic:
                            - generic:
                              - checkbox "วิเศษสิริวัฒน์ทรานสปอร์ต" [disabled]
                          - heading "วิเศษสิริวัฒน์ทรานสปอร์ต" [level=5] [ref=f3e2490]
                      - treeitem [ref=f3e2491]:
                        - generic [ref=f3e2500]:
                          - generic:
                            - generic:
                              - checkbox "วีพี กรีนเทค" [disabled]
                          - heading "วีพี กรีนเทค" [level=5] [ref=f3e2502]
                      - treeitem [ref=f3e2503]:
                        - generic [ref=f3e2512]:
                          - generic:
                            - generic:
                              - checkbox "วีระนันท์" [disabled]
                          - heading "วีระนันท์" [level=5] [ref=f3e2514]
                      - treeitem [ref=f3e2515]:
                        - generic [ref=f3e2524]:
                          - generic:
                            - generic:
                              - checkbox "ศรีพรกิจ ทรานสปอร์ต" [disabled]
                          - heading "ศรีพรกิจ ทรานสปอร์ต" [level=5] [ref=f3e2526]
                      - treeitem [ref=f3e2527]:
                        - generic [ref=f3e2536]:
                          - generic:
                            - generic:
                              - checkbox "ศรีวิชัยนาวี" [disabled]
                          - heading "ศรีวิชัยนาวี" [level=5] [ref=f3e2538]
                      - treeitem [ref=f3e2539]:
                        - generic [ref=f3e2548]:
                          - generic:
                            - generic:
                              - checkbox "ส.เจริญจิตค้าไม้" [disabled]
                          - heading "ส.เจริญจิตค้าไม้" [level=5] [ref=f3e2550]
                      - treeitem [ref=f3e2551]:
                        - generic [ref=f3e2560]:
                          - generic:
                            - generic:
                              - checkbox "ส.ภัทรวดี" [disabled]
                          - heading "ส.ภัทรวดี" [level=5] [ref=f3e2562]
                      - treeitem [ref=f3e2563]:
                        - generic [ref=f3e2572]:
                          - generic:
                            - generic:
                              - checkbox "สกลโฮมเซ็นเตอร์" [disabled]
                          - heading "สกลโฮมเซ็นเตอร์" [level=5] [ref=f3e2574]
                      - treeitem [ref=f3e2575]:
                        - generic [ref=f3e2584]:
                          - generic:
                            - generic:
                              - checkbox "สวัสดิ์ไพบูลย์การเกษตร" [disabled]
                          - heading "สวัสดิ์ไพบูลย์การเกษตร" [level=5] [ref=f3e2586]
                      - treeitem [ref=f3e2587]:
                        - generic [ref=f3e2596]:
                          - generic:
                            - generic:
                              - checkbox "สหะสันติสุขทรานสปอร์ต" [disabled]
                          - heading "สหะสันติสุขทรานสปอร์ต" [level=5] [ref=f3e2598]
                      - treeitem [ref=f3e2599]:
                        - generic [ref=f3e2608]:
                          - generic:
                            - generic:
                              - checkbox "สิวะดลบริหารสินค้า" [disabled]
                          - heading "สิวะดลบริหารสินค้า" [level=5] [ref=f3e2610]
                      - treeitem [ref=f3e2611]:
                        - generic [ref=f3e2620]:
                          - generic:
                            - generic:
                              - checkbox "สุขสมเกียรติ ขนส่ง 2004" [disabled]
                          - heading "สุขสมเกียรติ ขนส่ง 2004" [level=5] [ref=f3e2622]
                      - treeitem [ref=f3e2623]:
                        - generic [ref=f3e2632]:
                          - generic:
                            - generic:
                              - checkbox "สุนทรพัทลุง โลจิสติกส์" [disabled]
                          - heading "สุนทรพัทลุง โลจิสติกส์" [level=5] [ref=f3e2634]
                      - treeitem [ref=f3e2635]:
                        - generic [ref=f3e2644]:
                          - generic:
                            - generic:
                              - checkbox "สุมนยาสระบุรี 2001" [disabled]
                          - heading "สุมนยาสระบุรี 2001" [level=5] [ref=f3e2646]
                      - treeitem [ref=f3e2647]:
                        - generic [ref=f3e2656]:
                          - generic:
                            - generic:
                              - checkbox "อินทัช อินเตอร์กรุ๊ป" [disabled]
                          - heading "อินทัช อินเตอร์กรุ๊ป" [level=5] [ref=f3e2658]
                      - treeitem [ref=f3e2659]:
                        - generic [ref=f3e2668]:
                          - generic:
                            - generic:
                              - checkbox "อึ๊งย่งเส็ง" [disabled]
                          - heading "อึ๊งย่งเส็ง" [level=5] [ref=f3e2670]
                      - treeitem [ref=f3e2671]:
                        - generic [ref=f3e2680]:
                          - generic:
                            - generic:
                              - checkbox "เอทีพี 30" [disabled]
                          - heading "เอทีพี 30" [level=5] [ref=f3e2682]
                      - treeitem [ref=f3e2683]:
                        - generic [ref=f3e2692]:
                          - generic:
                            - generic:
                              - checkbox "เอ็ม เอ็ม ลอจิสติคส์" [disabled]
                          - heading "เอ็ม เอ็ม ลอจิสติคส์" [level=5] [ref=f3e2694]
                      - treeitem [ref=f3e2695]:
                        - generic [ref=f3e2704]:
                          - generic:
                            - generic:
                              - checkbox "เอส เอส แอล & อินทัช อินเตอร์กรุ๊ป" [disabled]
                          - heading "เอส เอส แอล & อินทัช อินเตอร์กรุ๊ป" [level=5] [ref=f3e2706]
                      - treeitem [ref=f3e2707]:
                        - generic [ref=f3e2716]:
                          - generic:
                            - generic:
                              - checkbox "เอส เอส แอล โลจิสติกส์" [disabled]
                          - heading "เอส เอส แอล โลจิสติกส์" [level=5] [ref=f3e2718]
                      - treeitem [ref=f3e2719]:
                        - generic [ref=f3e2728]:
                          - generic:
                            - generic:
                              - checkbox "เอสซีจี โลจิสติกส์ & ธนวัช รัตนมงคล" [disabled]
                          - heading "เอสซีจี โลจิสติกส์ & ธนวัช รัตนมงคล" [level=5] [ref=f3e2730]
                      - treeitem [ref=f3e2731]:
                        - generic [ref=f3e2740]:
                          - generic:
                            - generic:
                              - checkbox "เอสซีจี โลจิสติกส์ & ภัทรทรานสปอร์ต" [disabled]
                          - heading "เอสซีจี โลจิสติกส์ & ภัทรทรานสปอร์ต" [level=5] [ref=f3e2742]
                      - treeitem [ref=f3e2743]:
                        - generic [ref=f3e2752]:
                          - generic:
                            - generic:
                              - checkbox "เอสซีจี โลจิสติกส์ & ภัทร-นครหลวง" [disabled]
                          - heading "เอสซีจี โลจิสติกส์ & ภัทร-นครหลวง" [level=5] [ref=f3e2754]
                      - treeitem [ref=f3e2755]:
                        - generic [ref=f3e2764]:
                          - generic:
                            - generic:
                              - checkbox "เอสซีจี โลจิสติกส์ แมเนจเม้นท์" [disabled]
                          - heading "เอสซีจี โลจิสติกส์ แมเนจเม้นท์" [level=5] [ref=f3e2766]
                      - treeitem [ref=f3e2767]:
                        - generic [ref=f3e2776]:
                          - generic:
                            - generic:
                              - checkbox "เอสวีแอล & บีเอชแอล โททอล" [disabled]
                          - heading "เอสวีแอล & บีเอชแอล โททอล" [level=5] [ref=f3e2778]
                      - treeitem [ref=f3e2779]:
                        - generic [ref=f3e2788]:
                          - generic:
                            - generic:
                              - checkbox "เอสวีแอล คอร์ปอเรชั่น" [disabled]
                          - heading "เอสวีแอล คอร์ปอเรชั่น" [level=5] [ref=f3e2790]
                      - treeitem [ref=f3e2791]:
                        - generic [ref=f3e2800]:
                          - generic:
                            - generic:
                              - checkbox "เออีซี โลจิสติกส์" [disabled]
                          - heading "เออีซี โลจิสติกส์" [level=5] [ref=f3e2802]
                      - treeitem [ref=f3e2803]:
                        - generic [ref=f3e2812]:
                          - generic:
                            - generic:
                              - checkbox "เอื้อปัญญาทรานสปอร์ต 2004" [disabled]
                          - heading "เอื้อปัญญาทรานสปอร์ต 2004" [level=5] [ref=f3e2814]
                      - treeitem [ref=f3e2815]:
                        - generic [ref=f3e2824]:
                          - generic:
                            - generic:
                              - checkbox "แอล.เอ็ม.แอล.ดีเวลลอปเม้นท์ จำกัด" [disabled]
                          - heading "แอล.เอ็ม.แอล.ดีเวลลอปเม้นท์ จำกัด" [level=5] [ref=f3e2826]
                - treeitem [expanded] [ref=f3e2827]:
                  - generic [ref=f3e2836]:
                    - generic:
                      - generic:
                        - checkbox "Step" [disabled]
                    - heading "Step" [level=5] [ref=f3e2838]
                  - group [ref=f3e2840]:
                    - generic [ref=f3e2842]:
                      - treeitem [expanded] [ref=f3e2843]:
                        - generic [ref=f3e2852]:
                          - generic:
                            - generic:
                              - checkbox "Step2" [disabled]
                          - heading "Step2" [level=5] [ref=f3e2854]
                        - group [ref=f3e2856]:
                          - treeitem [ref=f3e2859]:
                            - generic [ref=f3e2868]:
                              - generic:
                                - generic:
                                  - checkbox "Step003" [disabled]
                              - heading "Step003" [level=5] [ref=f3e2870]
                      - treeitem [ref=f3e2871]:
                        - generic [ref=f3e2880]:
                          - generic:
                            - generic:
                              - checkbox "TEST_001" [disabled]
                          - heading "TEST_001" [level=5] [ref=f3e2882]
                - treeitem [expanded] [ref=f3e2883]:
                  - generic [ref=f3e2892]:
                    - generic:
                      - generic:
                        - checkbox "Step001" [disabled]
                    - heading "Step001" [level=5] [ref=f3e2894]
                  - group [ref=f3e2896]:
                    - treeitem [expanded] [ref=f3e2899]:
                      - generic [ref=f3e2908]:
                        - generic:
                          - generic:
                            - checkbox "Step002" [disabled]
                        - heading "Step002" [level=5] [ref=f3e2910]
                      - group [ref=f3e2912]:
                        - treeitem [ref=f3e2915]:
                          - generic [ref=f3e2924]:
                            - generic:
                              - generic:
                                - checkbox "Step3" [disabled]
                            - heading "Step3" [level=5] [ref=f3e2926]
                - treeitem [expanded] [ref=f3e2927]:
                  - generic [ref=f3e2936]:
                    - generic:
                      - generic:
                        - checkbox "Step003" [disabled]
                    - heading "Step003" [level=5] [ref=f3e2938]
                  - group [ref=f3e2940]:
                    - treeitem [expanded] [ref=f3e2943]:
                      - generic [ref=f3e2952]:
                        - generic:
                          - generic:
                            - checkbox "Step0013" [disabled]
                        - heading "Step0013" [level=5] [ref=f3e2954]
                      - group [ref=f3e2956]:
                        - treeitem [ref=f3e2959]:
                          - generic [ref=f3e2968]:
                            - generic:
                              - generic:
                                - checkbox "Step0014" [disabled]
                            - heading "Step0014" [level=5] [ref=f3e2970]
                - treeitem [ref=f3e2971]:
                  - generic [ref=f3e2980]:
                    - generic:
                      - generic:
                        - checkbox "Supply Chain" [disabled]
                    - heading "Supply Chain" [level=5] [ref=f3e2982]
                - treeitem [ref=f3e2983]:
                  - generic [ref=f3e2992]:
                    - generic:
                      - generic:
                        - checkbox "Temp" [disabled]
                    - heading "Temp" [level=5] [ref=f3e2994]
                - treeitem [ref=f3e2995]:
                  - generic [ref=f3e3004]:
                    - generic:
                      - generic:
                        - checkbox "Test Pra" [disabled]
                    - heading "Test Pra" [level=5] [ref=f3e3006]
                - treeitem [ref=f3e3007]:
                  - generic [ref=f3e3016]:
                    - generic:
                      - generic:
                        - checkbox "THAI DNT PAINT" [disabled]
                    - heading "THAI DNT PAINT" [level=5] [ref=f3e3018]
                - treeitem [expanded] [ref=f3e3019]:
                  - generic [ref=f3e3028]:
                    - generic:
                      - generic:
                        - checkbox "Thailand" [disabled]
                    - heading "Thailand" [level=5] [ref=f3e3030]
                  - group [ref=f3e3032]:
                    - generic [ref=f3e3034]:
                      - treeitem [expanded] [ref=f3e3035]:
                        - generic [ref=f3e3044]:
                          - generic:
                            - generic:
                              - checkbox "DL" [disabled]
                          - heading "DL" [level=5] [ref=f3e3046]
                        - group [ref=f3e3048]:
                          - treeitem [ref=f3e3051]:
                            - generic [ref=f3e3060]:
                              - generic:
                                - generic:
                                  - checkbox "DL" [disabled]
                              - heading "DL" [level=5] [ref=f3e3062]
                      - treeitem [ref=f3e3063]:
                        - generic [ref=f3e3072]:
                          - generic:
                            - generic:
                              - checkbox "PK" [disabled]
                          - heading "PK" [level=5] [ref=f3e3074]
                - treeitem [ref=f3e3075]:
                  - generic [ref=f3e3084]:
                    - generic:
                      - generic:
                        - checkbox "Transporter 1" [disabled]
                    - heading "Transporter 1" [level=5] [ref=f3e3086]
                - treeitem [expanded] [ref=f3e3087]:
                  - generic [ref=f3e3096]:
                    - generic:
                      - generic:
                        - checkbox "Transporter DD" [disabled]
                    - heading "Transporter DD" [level=5] [ref=f3e3098]
                  - group [ref=f3e3100]:
                    - treeitem [expanded] [ref=f3e3103]:
                      - generic [ref=f3e3112]:
                        - generic:
                          - generic:
                            - checkbox "Transporter DD1" [disabled]
                        - heading "Transporter DD1" [level=5] [ref=f3e3114]
                      - group [ref=f3e3116]:
                        - treeitem [ref=f3e3119]:
                          - generic [ref=f3e3128]:
                            - generic:
                              - generic:
                                - checkbox "Transporter DD2" [disabled]
                            - heading "Transporter DD2" [level=5] [ref=f3e3130]
                - treeitem [expanded] [ref=f3e3131]:
                  - generic [ref=f3e3140]:
                    - generic:
                      - generic:
                        - checkbox "TVS" [disabled]
                    - heading "TVS" [level=5] [ref=f3e3142]
                  - group [ref=f3e3144]:
                    - treeitem [ref=f3e3147]:
                      - generic [ref=f3e3156]:
                        - generic:
                          - generic:
                            - checkbox "PDC" [disabled]
                        - heading "PDC" [level=5] [ref=f3e3158]
                - treeitem [ref=f3e3159]:
                  - generic [ref=f3e3168]:
                    - generic:
                      - generic:
                        - checkbox "Uninstall" [disabled]
                    - heading "Uninstall" [level=5] [ref=f3e3170]
                - treeitem [expanded] [ref=f3e3171]:
                  - generic [ref=f3e3180]:
                    - generic:
                      - generic:
                        - checkbox "WEST" [disabled]
                    - heading "WEST" [level=5] [ref=f3e3182]
                  - group [ref=f3e3184]:
                    - generic [ref=f3e3186]:
                      - treeitem [ref=f3e3187]:
                        - generic [ref=f3e3196]:
                          - generic:
                            - generic:
                              - checkbox "WEST_Uthong" [disabled]
                          - heading "WEST_Uthong" [level=5] [ref=f3e3198]
                      - treeitem [ref=f3e3199]:
                        - generic [ref=f3e3208]:
                          - generic:
                            - generic:
                              - checkbox "WEST_Uthong3" [disabled]
                          - heading "WEST_Uthong3" [level=5] [ref=f3e3210]
                - treeitem [ref=f3e3211]:
                  - generic [ref=f3e3220]:
                    - generic:
                      - generic:
                        - checkbox "Yusen VRP" [disabled]
                    - heading "Yusen VRP" [level=5] [ref=f3e3222]
                - treeitem [expanded] [ref=f3e3223]:
                  - generic [ref=f3e3232]:
                    - generic:
                      - generic:
                        - checkbox "Zaza" [disabled]
                    - heading "Zaza" [level=5] [ref=f3e3234]
                  - group [ref=f3e3236]:
                    - generic [ref=f3e3238]:
                      - treeitem [ref=f3e3239]:
                        - generic [ref=f3e3248]:
                          - generic:
                            - generic:
                              - checkbox "checUp" [disabled]
                          - heading "checUp" [level=5] [ref=f3e3250]
                      - treeitem [ref=f3e3251]:
                        - generic [ref=f3e3260]:
                          - generic:
                            - generic:
                              - checkbox "NoReference" [disabled]
                          - heading "NoReference" [level=5] [ref=f3e3262]
                      - treeitem [ref=f3e3263]:
                        - generic [ref=f3e3272]:
                          - generic:
                            - generic:
                              - checkbox "Reference Code2Only" [disabled]
                          - heading "Reference Code2Only" [level=5] [ref=f3e3274]
                      - treeitem [ref=f3e3275]:
                        - generic [ref=f3e3284]:
                          - generic:
                            - generic:
                              - checkbox "ReferenceCodeAll" [disabled]
                          - heading "ReferenceCodeAll" [level=5] [ref=f3e3286]
                      - treeitem [ref=f3e3287]:
                        - generic [ref=f3e3296]:
                          - generic:
                            - generic:
                              - checkbox "S & P" [disabled]
                          - heading "S & P" [level=5] [ref=f3e3298]
      - separator [ref=f3e3300]
      - generic [ref=f3e3303]:
        - button "Save" [ref=f3e3305]
        - button "Cancel" [ref=f3e3308]
  - status [ref=f3e3311] [cursor=pointer]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | // ==========================================
  4   | // ⚙️ Global Config
  5   | // ==========================================
  6   | const BASE_URL = "/#/global-search";
  7   | const IMAGE_PATH = "tests_PostTest/TMS-Module/Product/Data/product-1.jpg";
  8   | const IMPORT_FILE_PATH = "tests_PostTest/TMS-Module/Product/Data/Import_Product_Master.xlsx";
  9   | const WAIT_TIME = 1500;
  10  | 
  11  | // Test Data
  12  | const TEST_CODE = "AT101";
  13  | const TEST_NAME = "ATest";
  14  | const TEST_SHORT_NAME = "AT";
  15  | const TEST_DESC = "Automate Test";
  16  | const TEST_DESC_UPDATE_1 = "ตัวอย่างข้อมูล UPDATE";
  17  | const TEST_DESC_UPDATE_2 = "ตัวอย่างข้อมูล UPDATE 2";
  18  | const TEST_CODE_COPY = "AT1010";
  19  | const TEST_NAME_COPY = "ATest1010";
  20  | const TEST_SHORT_NAME_COPY = "ATCopy1010";
  21  | 
  22  | const TEST_BU_SEARCH = "AGG";
  23  | const TEST_BU_NAME = "AGG UAT";
  24  | 
  25  | test("Product Master - End to End Flow", async ({ page }) => {
  26  | 
  27  |   // ----------------------------------------------------
  28  |   // 🛠️ Helper Function: สำหรับพิมพ์ค้นหา จะได้ไม่เปลืองบรรทัด
  29  |   // ----------------------------------------------------
  30  |   const searchProduct = async (keyword: string) => {
  31  |     const searchInput = page.getByPlaceholder('Search').or(page.getByRole('textbox').first());
  32  |     await searchInput.fill(keyword);
  33  |     await searchInput.press('Enter');
  34  |     await page.waitForTimeout(WAIT_TIME);
  35  |   };
  36  | 
  37  |   await test.step("1. Navigate to Product Master", async () => {
  38  |     await page.goto(BASE_URL);
  39  |     
  40  |     await page.getByTitle("Transportation Management").first().click();
  41  | 
  42  |     const transportMenu = page.getByRole("button", { name: "menu" });
  43  |     await transportMenu.waitFor({ state: "visible" });
  44  |     await page.waitForTimeout(WAIT_TIME);
  45  |     await transportMenu.click();
  46  | 
  47  |     await page.getByRole("button", { name: "Master Management" }).hover();
  48  |     await page.getByRole("button", { name: "Shipments" }).click();
  49  |     await page.getByRole("button", { name: "Product" }).click();
  50  |     await page.getByRole("button", { name: "Product Master" }).click();
  51  |     await page.waitForTimeout(WAIT_TIME);
  52  |   });
  53  | 
  54  |   await test.step("2. Create New Product & Upload Image", async () => {
  55  |     await page.locator('button').nth(1).click(); // กดปุ่ม Create
  56  | 
  57  |     // อัปโหลดและลบรูปภาพ
  58  |     await page.getByLabel('Add Picture').setInputFiles(IMAGE_PATH);
  59  |     await page.getByRole('img').filter({ hasText: /^$/ }).nth(4).click();
  60  |     await page.getByLabel('Add Picture').setInputFiles(IMAGE_PATH);
  61  | 
  62  |     // กรอกข้อมูลทั่วไป
  63  |     await page.locator('input[name="code"]').fill(TEST_CODE);
  64  |     await page.locator('input[name="name"]').fill(TEST_NAME);
  65  |     await page.locator('input[name="shortName"]').fill(TEST_SHORT_NAME);
  66  | 
  67  |     // เลือก Dropdowns
  68  |     await page.locator('#product-category-select').getByRole('textbox').click();
  69  |     await page.getByRole('menuitem', { name: 'ATest Product Categories' }).click();
  70  |     await page.locator('#product-type-select').getByRole('textbox').click();
  71  |     await page.getByRole('heading', { name: 'ATest Product Types' }).click();
  72  |     await page.locator('#product-status-select').getByRole('textbox').click();
  73  |     await page.getByRole('menuitem', { name: 'Active', exact: true }).click();
  74  |     await page.locator('#product-group-select').getByRole('textbox').click();
  75  |     await page.getByRole('heading', { name: 'Finished Goods', exact: true }).click();
  76  | 
  77  |     // ข้อมูล Hazardous & Description
  78  |     await page.getByRole('paragraph').filter({ hasText: 'Is Hazardous' }).getByRole('checkbox').check();
> 79  |     await page.locator('input[name="hazardousClass"]').fill('HC');
      |                                                                                                 ^ Error: locator.check: Clicking the checkbox did not change its state
  80  |     await page.locator('input[name="unNumber"]').fill('UN');
  81  |     await page.locator('input[name="description"]').fill(TEST_DESC);
  82  | 
  83  |     // เลือก Business Unit
  84  |     await page.locator('.MuiFormControl-root input[type="text"]').last().fill(TEST_BU_SEARCH);
  85  |     await page.getByText(TEST_BU_NAME, { exact: true }).click({ force: true });
  86  | 
  87  |   });
  88  | 
  89  |   await test.step("3. Product Unit Modal & Save", async () => {
  90  |     await page.getByRole('button', { name: 'Add' }).click();
  91  |     await page.getByRole('checkbox').check();
  92  | 
  93  |     await page.locator('#dialog-productUnit-unitSelected').getByRole('textbox').click();
  94  |     await page.getByRole('menuitem', { name: 'กิโลกรัม' }).click();
  95  | 
  96  |     await page.locator('#productUnit-productWeight').fill('10');
  97  |     await page.locator('#productUnit-productVolume').fill('100');
  98  |     await page.locator('#productUnit-conversionRate').fill('100');
  99  |     await page.locator('#productUnit-packageWeight').fill('0');
  100 |     await page.locator('#productUnit-packageVolume').fill('0');
  101 |     await page.locator('#productUnit-unitPrice').fill('100');
  102 | 
  103 |     await page.getByRole('button', { name: 'Save' }).click(); // Save Modal
  104 |     await page.getByRole('button', { name: 'Save' }).click(); // Save Main Page
  105 |     await page.getByRole('button', { name: 'OK' }).click();
  106 |     await page.waitForTimeout(WAIT_TIME);
  107 |   });
  108 | 
  109 |   await test.step("4. Import / Export Data", async () => {
  110 |     // Import Flow
  111 |     await page.getByRole("button").nth(2).click(); 
  112 |     await page.waitForTimeout(WAIT_TIME);
  113 |     await page.getByRole("button").nth(1).click(); // Download Template
  114 |     await page.getByRole('button', { name: 'OK' }).click();
  115 | 
  116 |     await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
  117 |     await page.getByRole('button', { name: 'Clear' }).click();
  118 |     await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
  119 |     await page.getByRole('button', { name: 'Import' }).click();
  120 | 
  121 |     // Export Flow
  122 |     await page.waitForTimeout(WAIT_TIME);
  123 |     await page.getByRole("button").nth(3).click(); 
  124 |     await page.getByRole('button', { name: 'OK' }).click();
  125 |     await page.waitForTimeout(WAIT_TIME);
  126 |   });
  127 | 
  128 |   await test.step("5. View and Copy Product", async () => {
  129 |     // ดูรายละเอียด
  130 |     await searchProduct(TEST_CODE);
  131 |     await page.getByText(TEST_CODE).click();
  132 |     await page.waitForTimeout(WAIT_TIME);
  133 |     await page.locator('button').nth(3).click(); // ปุ่ม Back
  134 | 
  135 |     // Copy ข้อมูล
  136 |     await searchProduct(TEST_CODE);
  137 |     await page.getByText(TEST_CODE).click();
  138 |     await page.locator('button').nth(2).click(); // ปุ่ม Copy
  139 |     await page.waitForTimeout(WAIT_TIME);
  140 | 
  141 |     await page.locator('input[name="code"]').fill(TEST_CODE_COPY);
  142 |     await page.locator('input[name="name"]').fill(TEST_NAME_COPY);
  143 |     await page.locator('input[name="shortName"]').fill(TEST_SHORT_NAME_COPY);
  144 |     await page.getByRole('button', { name: 'Save' }).click();
  145 |     await page.getByRole('button', { name: 'OK' }).click();
  146 |   });
  147 | 
  148 |   await test.step("6. Update Product (Details & Table)", async () => {
  149 |     // แก้ไขผ่านหน้ารายละเอียด (Details)
  150 |     await searchProduct(TEST_CODE);
  151 |     await page.getByText(TEST_CODE).click();
  152 |     await page.waitForTimeout(WAIT_TIME);
  153 |     
  154 |     await page.locator('button').nth(1).click(); // ปุ่ม Edit
  155 |     await page.waitForTimeout(WAIT_TIME);
  156 |     await page.locator('input[name="description"]').fill(TEST_DESC_UPDATE_1);
  157 |     await page.getByRole('button', { name: 'Save' }).click();
  158 |     await page.getByRole('button', { name: 'OK' }).click();
  159 | 
  160 |     // แก้ไขผ่านหน้าตาราง (Table Row)
  161 |     await searchProduct(TEST_CODE);
  162 |     const row = page.locator('tr', { hasText: TEST_CODE });
  163 |     await row.locator('button').nth(0).click({ force: true }); 
  164 |     
  165 |     await page.waitForTimeout(WAIT_TIME);
  166 |     await page.locator('input[name="description"]').fill(TEST_DESC_UPDATE_2);
  167 |     await page.getByRole('button', { name: 'Save' }).click();
  168 |     await page.getByRole('button', { name: 'OK' }).click();
  169 |     await page.waitForTimeout(WAIT_TIME);
  170 |   });
  171 | 
  172 |   await test.step("7. Delete Product", async () => {
  173 |     await searchProduct(TEST_CODE);
  174 |     const row = page.locator('tr', { hasText: TEST_CODE });
  175 |     await row.locator('button').nth(1).click({ force: true }); // ปุ่ม Delete
  176 |     await page.getByRole('button', { name: 'OK' }).click();
  177 |   });
  178 | 
  179 |   await test.step("8. Advanced Search", async () => {
```