'use client'
import React from 'react';
import Markdown from 'react-markdown';
import {MarkdownInputObject, MarkdownProps} from '@/types'

function replaceFoodFact(input: string): string {
    return input.replace(/Food_facts/g, "Food Facts");
}

const objectToMarkdown = (obj: Record<string, any>, level: number = 1): string => {
  let markdown = '';
  const indent = '  '.repeat(level);

  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      markdown += `${indent}- ${key}: ${obj[key].join(', ')}\n`;
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      markdown += `${indent}- **${key}:**\n`;
      markdown += objectToMarkdown(obj[key], level + 1);
    } else {
      markdown += `${indent}- **${key}:** ${obj[key]}\n`;
    }
  }

  return (replaceFoodFact(markdown));
};

const convertToMarkdown = (data: MarkdownInputObject): string => {
  const keys = ['warnings', 'advice', 'suggestions', 'recommendations', 'ingredients', 'food_facts'];
  let markdownText = '';

  keys.forEach(key => {
    if (Array.isArray(data[key])) {
      markdownText += `## ${key.charAt(0).toUpperCase() + key.slice(1)}\n\n`;
      data[key].forEach((item: string) => {
        markdownText += `- ${item}\n`;
      });
      markdownText += '\n';
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      markdownText += `## ${key.charAt(0).toUpperCase() + key.slice(1)}\n\n`;
      markdownText += objectToMarkdown(data[key]);
      markdownText += '\n';
    }
  });

  return markdownText;
};

const MarkdownPage: React.FC<MarkdownProps> = ({ data }) => {
  const markdownText = convertToMarkdown(data);
  console.log(markdownText);
  

  return (
    <div className='prose dark:prose-invert'>
      <h1>Markdown Preview</h1>
      <Markdown>{markdownText}</Markdown>
    </div>
  );
};

export default MarkdownPage;
