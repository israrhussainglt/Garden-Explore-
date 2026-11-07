export default function CategoryFilter({ categories, selectedCategory, onCategorySelect }) {
  return (
    <div className="overflow-x-auto scrollbar-hide px-4">
      <div className="flex gap-8 pb-2 min-w-min">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`px-5 py-2.5 rounded-full whitespace-nowrap font-bold transition-all duration-300 transform flex-shrink-0 ${
              selectedCategory === category.id
                ? 'bg-forest text-white shadow-lg scale-105 hover:shadow-xl'
                : 'bg-white text-forest border-2 border-gray-200 hover:border-natural hover:text-natural hover:shadow-md'
            }`}
            title={`Filter by ${category.name}`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
