const { PocketBase } = require('pocketbase')
const baseUrl = process.env.PB_BASE_URL || 'http://127.0.0.1:8090'
const [userEmail, userPassword] = process.argv.slice(2)
if (!userEmail || !userPassword) {
  console.error('usage: node seed.js <userEmail> <userPassword>')
  process.exit(1)
}
let pb
function safeCreate(collection, data) {
  return pb.collection(collection).create(data).catch(function(e) { console.warn('  [skip] ' + collection + ': ' + e.message); return null })
}
async function main() {
  pb = new PocketBase(baseUrl)
  await pb.collection('users').authWithPassword(userEmail, userPassword)
  const familyId = pb.authStore.record.familyId
  if (!familyId) { console.error('error: no familyId'); process.exit(1) }
  console.log('login ok, familyId = ' + familyId)
  const F = { familyId }
  // ---- clean ----
  const collections = ['gifts', 'bookItems', 'books', 'friendTags', 'friends', 'households']
  for (const col of collections) {
    let page = 1
    while (true) {
      const records = await pb.collection(col).getList(page, 500, { filter: 'familyId = "' + familyId + '"' })
      if (records.items.length === 0) break
      for (const item of records.items) { try { await pb.collection(col).delete(item.id) } catch (e) { console.warn('  delete ' + col + '/' + item.id + ' failed: ' + e.message) } }
      if (records.items.length < 500) break
    }
    console.log('cleared ' + col)
  }
  // ---- Households ----
  const households = {}
  const hDefs = [
    { name: '王叔家', category: '亲戚', address: '北京市朝阳区', hometown: '河北保定', remarks: '每年过年走动' },
    { name: '老陈家', category: '朋友', address: '上海市浦东新区', hometown: '江苏南京', remarks: '多年好友' },
    { name: '空户', category: '其他', address: '', hometown: '', remarks: '测试用空户' },
  ]
  for (const h of hDefs) {
    const record = await safeCreate('households', Object.assign({}, h, F))
    if (record) { households[h.name] = record.id; console.log('created household: ' + h.name + ' (' + record.id + ')') }
  }
  // ---- Friends ----
  // friends schema: name, firstLetter, tagList, remarks, relation, familyId
  // boundary cases (lunar birthday, leap month, month-day only, 2/29, contact interval)
  // are stored in remarks as text placeholders until phase 2 adds real fields.
  // No householdId is assigned (household association is phase 3).
  const friends = {}
  const friendDefs = [
    { name: '王建国', firstLetter: 'W', relation: '叔叔', tagList: ['亲戚'], remarks: '王叔家户主；联系间隔90天，上次互动100天前' },
    { name: '王秀英', firstLetter: 'W', relation: '婶婶', tagList: ['亲戚'], remarks: '王叔家' },
    { name: '陈志远', firstLetter: 'C', relation: '朋友', tagList: ['朋友'], remarks: '老陈家户主' },
    { name: '陈丽萍', firstLetter: 'C', relation: '朋友', tagList: ['朋友'], remarks: '老陈家' },
    { name: '张三', firstLetter: 'Z', relation: '同事', tagList: ['同事'], remarks: '农历八月十六生日' },
    { name: '李四', firstLetter: 'L', relation: '同事', tagList: ['同事'], remarks: '闰月生日（闰六月十五）' },
    { name: '赵小明', firstLetter: 'Z', relation: '同学', tagList: ['同学'], remarks: '生日只有月日无年份（7月20日）' },
    { name: '孙小红', firstLetter: 'S', relation: '', tagList: [], remarks: '公历2月29日生日' },
  ]
  for (const f of friendDefs) {
    const record = await safeCreate('friends', Object.assign({}, f, F))
    if (record) { friends[f.name] = record.id; console.log('created friend: ' + f.name + ' (' + record.id + ')') }
  }
  // ---- Gifts (35) ----
  // gifts schema: title, money, moneyType, icon, remarks, date, friendId,
  //   friendName, friendRelation, friendTagList, entityName, payWay, familyId
  let giftCount = 0
  const now = new Date()
  function daysAgo(n) { const d = new Date(now); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10) }
  // 收礼 (money positive) - 10
  for (let i = 1; i <= 10; i++) {
    const fn = ['王建国', '陈志远', '赵小明', '李四'][i % 4]
    await safeCreate('gifts', Object.assign({ title: '收礼' + i, money: 200 + i * 50, moneyType: 1, icon: 'gift', date: daysAgo(i * 10), friendId: friends[fn] || '', friendName: fn, friendRelation: '朋友', friendTagList: ['亲戚'] }, F))
    giftCount++; console.log('created gift ' + giftCount + ': 收礼' + i)
  }
  // 送礼 (money negative) - 8
  for (let i = 1; i <= 8; i++) {
    const fn = ['王秀英', '陈丽萍', '张三', '赵小明'][i % 4]
    await safeCreate('gifts', Object.assign({ title: '送礼' + i, money: -(100 + i * 30), moneyType: 2, icon: 'gift', date: daysAgo(i * 15 + 5), friendId: friends[fn] || '', friendName: fn, friendRelation: '朋友', friendTagList: ['朋友'] }, F))
    giftCount++; console.log('created gift ' + giftCount + ': 送礼' + i)
  }
  // 金额为0的见面记录 - 5
  for (let i = 1; i <= 5; i++) {
    const fn = ['王建国', '陈志远', '张三', '李四', '赵小明'][i - 1]
    await safeCreate('gifts', Object.assign({ title: '见面' + i, money: 0, moneyType: 3, icon: 'handshake', date: daysAgo(i * 20 + 3), friendId: friends[fn] || '', friendName: fn, friendRelation: '朋友', friendTagList: [] }, F))
    giftCount++; console.log('created gift ' + giftCount + ': 见面' + i)
  }
  // 白事 (标题含奠) - 3
  for (let i = 1; i <= 3; i++) {
    const fn = ['王建国', '陈志远', '李四'][i - 1]
    await safeCreate('gifts', Object.assign({ title: '奠仪' + i, money: 500 + i * 100, moneyType: 1, icon: 'flower', date: daysAgo(i * 30 + 10), friendId: friends[fn] || '', friendName: fn, friendRelation: '亲戚', friendTagList: ['亲戚'] }, F))
    giftCount++; console.log('created gift ' + giftCount + ': 奠仪' + i)
  }
  // 带实物估值的 - 4
  for (let i = 1; i <= 4; i++) {
    const fn = ['王秀英', '陈丽萍', '张三', '赵小明'][i - 1]
    await safeCreate('gifts', Object.assign({ title: '礼品' + i, money: 300 + i * 80, moneyType: 1, icon: 'box', date: daysAgo(i * 12 + 50), friendId: friends[fn] || '', friendName: fn, friendRelation: '朋友', friendTagList: ['朋友'], entityName: '烟酒礼盒' + i + '号' }, F))
    giftCount++; console.log('created gift ' + giftCount + ': 礼品' + i)
  }
  // 同一 household 下不同成员各出一笔 - 5
  // (household association is phase 3, so these are just gifts from
  //  friends who happen to belong to the same household in reality)
  const sameHouseholdFriends = ['王建国', '王秀英', '陈志远', '陈丽萍', '张三']
  for (let i = 0; i < sameHouseholdFriends.length; i++) {
    const fn = sameHouseholdFriends[i]
    await safeCreate('gifts', Object.assign({ title: fn + '的随礼', money: 600, moneyType: 1, icon: 'gift', date: daysAgo(200 + i * 7), friendId: friends[fn] || '', friendName: fn, friendRelation: '亲戚', friendTagList: ['亲戚'] }, F))
    giftCount++; console.log('created gift ' + giftCount + ': ' + fn + '的随礼')
  }
  console.log('\n完成! 共创建 ' + giftCount + ' 条 gift')
  console.log('  households: ' + Object.keys(households).length)
  console.log('  friends: ' + Object.keys(friends).length)
  console.log('  gifts: ' + giftCount)
}
main().catch(function(err) { console.error('执行失败:', err); process.exit(1) })
