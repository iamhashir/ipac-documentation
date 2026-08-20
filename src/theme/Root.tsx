import type {ReactNode} from 'react';
import CommandPalette from '@site/src/components/CommandPalette';
import MermaidEnhancer from '@site/src/components/MermaidEnhancer';

export default function Root({children}: {children: ReactNode}): ReactNode {
  return (
    <>
      {children}
      <MermaidEnhancer />
      <CommandPalette />
    </>
  );
}
