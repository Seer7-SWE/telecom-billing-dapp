// backend/mockBlockchain.js
let balances = {};
let usageLogs = {};

export const subscribePlan = (userId, planId) => {
  balances[userId] = balances[userId] || { prepaid: 0, postpaid: 0 };
  balances[userId].plan = planId;
  usageLogs[userId] = usageLogs[userId] || [];
  return { success: true, planId };
};

export const recharge = (userId, amount) => {
  balances[userId].prepaid += amount;
  return { success: true, balance: balances[userId].prepaid };
};

export const deductUsage = (userId, amount) => {
  balances[userId].prepaid -= amount;
  usageLogs[userId].push({ amount, date: new Date() });
  return { success: true, balance: balances[userId].prepaid };
};

export const settleBill = (userId, amount) => {
  balances[userId].postpaid -= amount;
  return { success: true, balance: balances[userId].postpaid };
};

export const getUsageLogs = (userId) => {
  return usageLogs[userId] || [];
};
