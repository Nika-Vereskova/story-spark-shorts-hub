
import React from 'react';
import { ChartConfig } from './chart';

interface SafeChartStyleProps {
  id: string;
  config: ChartConfig;
}

// Themes mapping for safe CSS generation
const THEMES = { light: "", dark: ".dark" } as const;

export const SafeChartStyle: React.FC<SafeChartStyleProps> = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  );

  if (!colorConfig.length) {
    return null;
  }

  // Generate CSS rules safely without dangerouslySetInnerHTML
  const cssRules = Object.entries(THEMES).map(([theme, prefix]) => {
    const selector = `${prefix} [data-chart="${id}"]`;
    const properties = colorConfig
      .map(([key, itemConfig]) => {
        const color =
          itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
          itemConfig.color;
        return color ? `--color-${key}: ${color};` : null;
      })
      .filter(Boolean)
      .join(' ');
    
    return properties ? `${selector} { ${properties} }` : null;
  }).filter(Boolean);

  if (cssRules.length === 0) {
    return null;
  }

  // Create a style element safely
  return (
    <style>
      {cssRules.join('\n')}
    </style>
  );
};
