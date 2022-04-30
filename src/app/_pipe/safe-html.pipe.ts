import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: string) {
    console.log(value);
    
    if (value) {
      return this.sanitized.bypassSecurityTrustHtml(
        value
          .replace(new RegExp('&lt;', 'g'), '<')
          .replace(new RegExp('&gt;', 'g'), '>')
      );
    }
    else {
      return '';
    }
  }
}
