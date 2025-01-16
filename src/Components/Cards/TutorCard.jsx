const TutorCard = ({ tutor }) => {
  const { image, name } = tutor;

  return (
    <div className="relative group w-80 h-96 bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      {/* Image Container with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt="Tutor"
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 animate-fade-in font-heading">
          {name}
        </h3>

        <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <p className="text-violet-600 font-semibold">Tutor</p>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
};

export default TutorCard;
