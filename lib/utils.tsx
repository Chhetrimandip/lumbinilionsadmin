import { randomUUID } from "crypto";

export function slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')       // Replace spaces with -
      .replace(/&/g, '-and-')     // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')   // Remove all non-word characters
      .replace(/\-\-+/g, '-');    // Replace multiple - with single -
  }

/*
  fansdata type: object
FanView.tsx:23 fansdata value: Array(5)


/* The URI (Uniform Resource Identifier) in this context isn't exactly a link in the traditional sense of a web URL. In the code, the URI is actually a data URI scheme which is a way to embed data directly in a document.

Let me explain what's happening in the `downloadcsv` function:

1. The data URI scheme `data:text/plain;charset=utf-8,` is used to specify:
  - `data:` - This is a data URI
  - `text/plain` - The MIME type
  - `charset=utf-8` - Character encoding
  - `,` - Separator before the actual data

2. `encodeURIComponent(text)` ensures that special characters in your text are properly escaped so they don't break the data URI format.

If you don't encode the URI component:
- Special characters like spaces, newlines, and symbols would break the data URI
- Browsers might misinterpret parts of your data as URI syntax
- The file content could be corrupted or truncated

You should absolutely keep the `encodeURIComponent()` for proper and reliable functionality.

Always check the correctness of AI-generated responses.*/
// ...existing code...

export function downloadcsv(fansArray: {id:string, name:string, email:string, phone:string, score:number, time:number}[]) {
  // Helper function to escape CSV fields properly
  const escapeCSV = (field: any) => {
    const stringField = String(field);
    // If the field contains quotes, commas, or newlines, it needs to be quoted and quotes need to be escaped
    if (stringField.includes('"') || stringField.includes(',') || stringField.includes('\n')) {
      // Double any quotes in the field (CSV escape rule)
      return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
  };

  // Create CSV header
  const header = 'id,name,email,phone,score,time';
  
  // Generate rows with proper escaping
  const rows = fansArray.map(fan => {
    return [
      escapeCSV(fan.id),
      escapeCSV(fan.name),
      escapeCSV(fan.email),
      escapeCSV(fan.phone),
      escapeCSV(fan.score),
      escapeCSV(fan.time)
    ].join(',');
  });
  
  // Join header and rows
  const csvString = `${header}\n${rows.join('\n')}`;
  
  // Create the download
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  
  const element = document.createElement('a');
  element.setAttribute('href', url);
  // Add date to filename for better organization
  const date = new Date().toISOString().split('T')[0];
  element.setAttribute('download', `fans-export-${date}.csv`);
  
  element.style.display = 'none';
  document.body.appendChild(element);
  
  element.click();
  
  // Clean up
  window.URL.revokeObjectURL(url);
  document.body.removeChild(element);
}