import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 为ES模块获取__dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 简单的frontmatter解析函数
function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return { metadata: {}, content: content };
  }
  
  const frontmatter = frontmatterMatch[1];
  const restContent = content.replace(/---\n[\s\S]*?\n---/, '').trim();
  
  const metadata = {};
  frontmatter.split('\n').forEach(line => {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const key = match[1];
      let value = match[2];
      
      // 处理数组 - 修复tags数组解析
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          // 尝试JSON解析
          value = JSON.parse(value);
        } catch (e) {
          // 如果直接JSON解析失败，尝试手动解析
          if (key === 'tags') {
            // 移除数组的括号并分割
            const tagsStr = value.slice(1, -1).trim();
            if (tagsStr) {
              // 分割标签并去除引号和空格
              value = tagsStr.split(',').map(tag => 
                tag.trim().replace(/^['"]|['"]$/g, '')
              );
            } else {
              value = [];
            }
          }
        }
      }
      // 处理引号
      else if ((value.startsWith('\'') && value.endsWith('\'')) || 
               (value.startsWith('"') && value.endsWith('"'))) {
        value = value.slice(1, -1);
      }
      
      metadata[key] = value;
    }
  });
  
  return { metadata, content: restContent };
}

// 生成文章摘要
function generateExcerpt(content, maxLength = 150) {
  // 移除Markdown标记
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // 移除标题标记
    .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体
    .replace(/\*(.*?)\*/g, '$1') // 移除斜体
    .replace(/`(.*?)`/g, '$1') // 移除行内代码
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接，保留文本
    .replace(/\n+/g, ' ') // 将换行符替换为空格
    .trim();
  
  // 截取指定长度
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...' 
    : plainText;
}

// 读取所有Markdown文件并解析
function processMarkdownFiles() {
  const markdownDir = path.resolve(__dirname, '../src/markdown');
  const outputDir = path.resolve(__dirname, '../src/data');
  const outputFile = path.resolve(outputDir, 'articles.json');
  
  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 读取所有Markdown文件
  const files = fs.readdirSync(markdownDir).filter(file => file.endsWith('.md'));
  
  const articles = [];
  
  files.forEach(file => {
    const filePath = path.join(markdownDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const { metadata, content: markdownContent } = parseFrontmatter(content);
    
    // 生成文章ID（从文件名提取）
    const id = file.replace('.md', '');
    
    // 创建文章对象
    const article = {
      id,
      title: metadata.title || '未命名文章',
      content: markdownContent,
      excerpt: generateExcerpt(markdownContent),
      category: metadata.category || '默认',
      tags: metadata.tags || [],
      date: metadata.date || new Date().toISOString().split('T')[0],
      author: metadata.author || '未知作者',
      cover: metadata.cover || ''
    };
    
    articles.push(article);
  });
  
  // 按日期排序（最新的在前）
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // 写入JSON文件
  fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
  console.log(`成功生成 ${articles.length} 篇文章的数据文件`);
}

// 运行处理函数
processMarkdownFiles();