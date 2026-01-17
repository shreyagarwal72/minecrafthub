import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ShowcaseCardProps {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  href: string;
  className?: string;
}

const ShowcaseCard = ({ 
  title, 
  description, 
  image, 
  buttonText, 
  href,
  className = ""
}: ShowcaseCardProps) => {
  return (
    <div className={`card-gaming group ${className}`}>
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-xl mb-6">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-bg/80 via-gaming-bg/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gaming-text group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gaming-text-muted leading-relaxed line-clamp-2">
          {description}
        </p>

        <Button 
          asChild 
          data-magnetic
          className="btn-gaming-outline w-full group/btn"
        >
          <Link to={href} className="flex items-center justify-center gap-2">
            {buttonText}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ShowcaseCard;