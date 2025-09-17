import { Button } from "@/components/ui/button";

interface ShowcaseCardProps {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  onButtonClick: () => void;
  className?: string;
}

const ShowcaseCard = ({ 
  title, 
  description, 
  image, 
  buttonText, 
  onButtonClick,
  className = ""
}: ShowcaseCardProps) => {
  return (
    <div className={`card-gaming group ${className}`}>
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-xl mb-6">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gaming-text group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gaming-text-muted leading-relaxed">
          {description}
        </p>

        <Button 
          className="btn-gaming-outline w-full group-hover:scale-105 transition-transform duration-300"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ShowcaseCard;