
import React from 'react';
import { ShieldCheck } from 'lucide-react';

function ComparisonTable({ products }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border bg-card shadow-sm mb-12">
      <table className="w-full text-left border-collapse">
        <thead className="bg-muted border-b border-border">
          <tr>
            <th className="px-6 py-4 font-bold text-[hsl(var(--foreground))] text-sm uppercase tracking-wider whitespace-nowrap">Product</th>
            <th className="px-6 py-4 font-bold text-[hsl(var(--foreground))] text-sm uppercase tracking-wider whitespace-nowrap">Key Feature</th>
            <th className="px-6 py-4 font-bold text-[hsl(var(--foreground))] text-sm uppercase tracking-wider whitespace-nowrap">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product, index) => (
            <tr key={index} className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold text-[hsl(var(--foreground))] text-base">{product.name}</div>
                    {product.bestPick && (
                      <div className="inline-flex items-center gap-1 mt-1 bg-muted text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" /> Best Pick
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="font-bold text-lg text-[hsl(var(--foreground))]">{product.featureValue}</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))] font-medium uppercase tracking-wider">{product.featureLabel}</div>
              </td>
              <td className="px-6 py-5">
                <ul className="space-y-1">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="text-[14px] text-[hsl(var(--muted-foreground))] flex items-center before:content-['•'] before:mr-2 before:text-[hsl(var(--accent))]">
                      {detail}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComparisonTable;
