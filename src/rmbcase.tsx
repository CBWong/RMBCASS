import { List, ActionPanel, Action } from "@raycast/api";
import { useState } from "react";

// 引入 nzh 库
import Nzh from "nzh";

// 转换为人民币大写
function toChineseRMB(numStr: string): string {
  const cleanedInput = numStr.replace(/[^0-9.]/g, "");
  if (!cleanedInput || isNaN(Number(cleanedInput))) {
    return "请输入有效金额";
  }

  const num = parseFloat(cleanedInput);
  if (num < 0 || num >= 1e16) {
    return "金额需在 0 到 1万亿之间";
  }

  // 使用 nzh 库进行转换
  let result = Nzh.cn.toMoney(num);

  // 去除“人民币”字样
  result = result.replace("人民币", "");

  return result;
}

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const result = toChineseRMB(searchText);

  return (
    <List
      searchBarPlaceholder="输入金额（如 100 或 123.45）"
      onSearchTextChange={(text) => setSearchText(text)}
      searchText={searchText}
    >
      <List.Item
        title={result}
        actions={
          <ActionPanel>
            <Action.CopyToClipboard content={result} />
          </ActionPanel>
        }
      />
    </List>
  );
}