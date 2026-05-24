import { PortfolioClient } from "@/components/portfolio/PortfolioClient";
import portfolioData from "@/content/portfolio.json";
import type { PortfolioData } from "@/types/portfolio";

export default function HomePage() {
  return <PortfolioClient data={portfolioData as PortfolioData} />;
}
