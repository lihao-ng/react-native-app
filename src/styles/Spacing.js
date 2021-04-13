import { sizes } from "../theme/Variables";

// Padding

export const pt_0 = { paddingTop: 0 };
export const pt_1 = { paddingTop: sizes.xs };
export const pt_2 = { paddingTop: sizes.s };
export const pt_3 = { paddingTop: sizes.m };
export const pt_4 = { paddingTop: sizes.l };
export const pt_5 = { paddingTop: sizes.xl };

export const pb_0 = { paddingBottom: 0 };
export const pb_1 = { paddingBottom: sizes.xs };
export const pb_2 = { paddingBottom: sizes.s };
export const pb_3 = { paddingBottom: sizes.m };
export const pb_4 = { paddingBottom: sizes.l };
export const pb_5 = { paddingBottom: sizes.xl };

export const pl_0 = { paddingLeft: 0 };
export const pl_1 = { paddingLeft: sizes.xs };
export const pl_2 = { paddingLeft: sizes.s };
export const pl_3 = { paddingLeft: sizes.m };
export const pl_4 = { paddingLeft: sizes.l };
export const pl_5 = { paddingLeft: sizes.xl };

export const pr_0 = { paddingRight: 0 };
export const pr_1 = { paddingRight: sizes.xs };
export const pr_2 = { paddingRight: sizes.s };
export const pr_3 = { paddingRight: sizes.m };
export const pr_4 = { paddingRight: sizes.l };
export const pr_5 = { paddingRight: sizes.xl };

export const py_0 = { ...pt_0, ...pb_0 };
export const py_1 = { ...pt_1, ...pb_1 };
export const py_2 = { ...pt_2, ...pb_2 };
export const py_3 = { ...pt_3, ...pb_3 };
export const py_4 = { ...pt_4, ...pb_4 };
export const py_5 = { ...pt_5, ...pb_5 };

export const px_0 = { ...pl_0, ...pr_0 };
export const px_1 = { ...pl_1, ...pr_1 };
export const px_2 = { ...pl_2, ...pr_2 };
export const px_3 = { ...pl_3, ...pr_3 };
export const px_4 = { ...pl_4, ...pr_4 };
export const px_5 = { ...pl_5, ...pr_5 };

export const p_0 = { ...py_0, ...px_0 };
export const p_1 = { ...py_1, ...px_1 };
export const p_2 = { ...py_2, ...px_2 };
export const p_3 = { ...py_3, ...px_3 };
export const p_4 = { ...py_4, ...px_4 };
export const p_5 = { ...py_5, ...px_5 };

// Margin

export const mt_0 = { marginTop: 0 };
export const mt_1 = { marginTop: sizes.xs };
export const mt_2 = { marginTop: sizes.s };
export const mt_3 = { marginTop: sizes.m };
export const mt_4 = { marginTop: sizes.l };
export const mt_5 = { marginTop: sizes.xl };

export const mb_0 = { marginBottom: 0 };
export const mb_1 = { marginBottom: sizes.xs };
export const mb_2 = { marginBottom: sizes.s };
export const mb_3 = { marginBottom: sizes.m };
export const mb_4 = { marginBottom: sizes.l };
export const mb_5 = { marginBottom: sizes.xl };

export const ml_0 = { marginLeft: 0 };
export const ml_1 = { marginLeft: sizes.xs };
export const ml_2 = { marginLeft: sizes.s };
export const ml_3 = { marginLeft: sizes.m };
export const ml_4 = { marginLeft: sizes.l };
export const ml_5 = { marginLeft: sizes.xl };

export const mr_0 = { marginRight: 0 };
export const mr_1 = { marginRight: sizes.xs };
export const mr_2 = { marginRight: sizes.s };
export const mr_3 = { marginRight: sizes.m };
export const mr_4 = { marginRight: sizes.l };
export const mr_5 = { marginRight: sizes.xl };

export const my_0 = { ...mt_0, ...mb_0 };
export const my_1 = { ...mt_1, ...mb_1 };
export const my_2 = { ...mt_2, ...mb_2 };
export const my_3 = { ...mt_3, ...mb_3 };
export const my_4 = { ...mt_4, ...mb_4 };
export const my_5 = { ...mt_5, ...mb_5 };

export const mx_0 = { ...ml_0, ...mr_0 };
export const mx_1 = { ...ml_1, ...mr_1 };
export const mx_2 = { ...ml_2, ...mr_2 };
export const mx_3 = { ...ml_3, ...mr_3 };
export const mx_4 = { ...ml_4, ...mr_4 };
export const mx_5 = { ...ml_5, ...mr_5 };

export const m_0 = { ...my_0, ...mx_0 };
export const m_1 = { ...my_1, ...mx_1 };
export const m_2 = { ...my_2, ...mx_2 };
export const m_3 = { ...my_3, ...mx_3 };
export const m_4 = { ...my_4, ...mx_4 };
export const m_5 = { ...my_5, ...mx_5 };