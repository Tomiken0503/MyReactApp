import React, { memo } from "react";
import { Typography } from "@mui/material";

// React.memoでパフォーマンスチューニング
export const TodoTitle = memo(({ title, as }) => {
  // asがh1ならば タイトルは h1タグ
  if (as === 'h1') return <Typography variant="h4" component="h1" color="primary" mb={3} mt={2}>{title}</Typography>;
  // asがh2なら タイトルは h２タグ
  if (as === 'h2') return <Typography variant="h5" component="h2" color="primary" mb={3}>{title}</Typography>;

  // どちらでもなければ p タグ
  return <Typography variant="h6" color="primary">{title}</Typography>;
});