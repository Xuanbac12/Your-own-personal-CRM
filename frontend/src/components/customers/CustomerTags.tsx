import React from 'react';

interface CustomerTagsProps {
  tags: {
    id: number;
    name: string;
    color: string;
  }[];
  
}

export const CustomerTags: React.FC<CustomerTagsProps> = ({ tags }) => {
  if (!tags.length) return <span className="text-gray-400 text-sm">Không có</span>;

  const visibleTags = tags.slice(0, 2);
  const remainingTags = tags.length > 2 ? tags.length - 2 : 0;

  return (
    <div className="flex flex-wrap gap-1">
      {visibleTags.map((tag) => (
        <span
          key={tag.id}
          className="px-2 py-0.5 text-xs font-medium rounded-full text-white"
          style={{ backgroundColor: tag.color }}
        >
          {tag.name}
        </span>
      ))}
      {remainingTags > 0 && (
        <span
          className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full cursor-help"
          title={tags.slice(2).map(t => t.name).join(", ")}
        >
          +{remainingTags}
        </span>
      )}
    </div>
  );
};

