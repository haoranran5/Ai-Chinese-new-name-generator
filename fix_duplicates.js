const fs = require('fs');

// 读取文件
const content = fs.readFileSync('src/data/famousChinesePeople.ts', 'utf8');

// 找到所有重复的ID
const idMatches = content.match(/id: '([^']+)'/g);
const ids = idMatches.map(match => match.match(/id: '([^']+)'/)[1]);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

console.log('重复的ID:', duplicates);

// 找到重复ID的行号
const lines = content.split('\n');
const duplicateLines = [];

lines.forEach((line, index) => {
  duplicates.forEach(dupId => {
    if (line.includes(`id: '${dupId}'`)) {
      duplicateLines.push({ line: index + 1, id: dupId, content: line.trim() });
    }
  });
});

console.log('\n重复ID的位置:');
duplicateLines.forEach(item => {
  console.log(`第${item.line}行: ${item.id}`);
});

// 统计每个ID出现的次数
const idCounts = {};
ids.forEach(id => {
  idCounts[id] = (idCounts[id] || 0) + 1;
});

console.log('\nID出现次数:');
Object.entries(idCounts)
  .filter(([id, count]) => count > 1)
  .forEach(([id, count]) => {
    console.log(`${id}: ${count}次`);
  }); 