import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptDetector {
  private readonly prompts = [
    /ZXAN[#>]\s*$/m,
    /[#>]\s*$/m,
  ];

  isPrompt(buffer: string): boolean {
    return this.prompts.some((prompt) =>
      prompt.test(buffer),
    );
  }

  getPrompt(buffer: string): string | null {
    for (const prompt of this.prompts) {
      const match = buffer.match(prompt);

      if (match) {
        return match[0];
      }
    }

    return null;
  }
}