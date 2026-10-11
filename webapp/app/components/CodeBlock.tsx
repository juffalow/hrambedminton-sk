import { useState } from 'react';
import { Button } from '@heroui/react';

interface Props {
  code: string;
  copyLabel: string;
  copiedLabel: string;
  trackingId?: string;
}

/**
 * Monospace block (command, URL, ID) with a button that copies it to the clipboard.
 */
export default function CodeBlock({ code, copyLabel, copiedLabel, trackingId }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Clipboard is not available (e.g. insecure context), the text can still be selected manually
    }
  };

  return (
    <div className="flex items-start gap-2 rounded-lg bg-gray-100 p-3">
      <pre className="flex-grow overflow-x-auto whitespace-pre-wrap break-all font-mono text-sm">
        <code>{code}</code>
      </pre>
      <Button size="sm" variant="tertiary" onPress={handleCopy} data-tracking-id={trackingId}>
        {isCopied ? copiedLabel : copyLabel}
      </Button>
    </div>
  );
}
