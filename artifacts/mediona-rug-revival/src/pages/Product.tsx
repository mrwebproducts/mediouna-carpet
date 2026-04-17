import { Layout } from "@/components/layout/Layout";
import { rugs } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { useParams, useSearch } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Product() {
  const { id } = useParams();
  const searchString = useSearch();
  const isOrderView = searchString.includes("order=true");
  const { t } = useLanguage();
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const rug = rugs.find((r) => r.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!rug) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-serif">Rug not found</h1>
        </div>
      </Layout>
    );
  }

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);
  };

  return (
    <Layout>
      <div className="bg-background min-h-screen py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            {/* Image Section */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="aspect-[3/4] overflow-hidden rounded-sm bg-muted animate-in fade-in slide-in-from-left-8 duration-700">
                <img 
                  src={rug.image} 
                  alt={rug.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Video Placeholder */}
              <div className="aspect-video bg-secondary rounded-sm flex items-center justify-center flex-col text-secondary-foreground animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary border-b-8 border-b-transparent ml-1"></div>
                </div>
                <span className="font-sans text-sm">Artisan Interview Video</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 space-y-10 animate-in fade-in slide-in-from-right-8 duration-700 delay-150 fill-mode-both">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-serif text-primary leading-tight">{rug.name}</h1>
                <div className="flex items-center gap-4 text-lg font-sans">
                  <span className="text-muted-foreground">{t("product.by")} <span className="font-medium text-foreground">{rug.artisan}</span></span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-primary font-bold">{rug.price} MAD</span>
                </div>
                <div className="w-12 h-1 bg-accent"></div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">The Story</h3>
                  <p className="font-sans text-lg leading-relaxed">{rug.story}</p>
                </div>

                <div>
                  <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">{t("product.symbols")}</h3>
                  <p className="font-sans text-lg leading-relaxed">{rug.symbols}</p>
                </div>

                <div className="flex gap-8 py-6 border-y border-border">
                  <div>
                    <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-muted-foreground mb-1">{t("product.time")}</h3>
                    <p className="font-sans text-lg font-medium">{rug.timeToCreate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-muted-foreground mb-1">Origin</h3>
                    <p className="font-sans text-lg font-medium">Mediona, Morocco</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-6 rounded-sm">
                <p className="font-serif text-primary text-center italic text-lg">
                  "{t("product.message")}"
                </p>
              </div>

              {/* Order Form */}
              <div className="pt-8 border-t border-border" id="order-section">
                {orderSubmitted ? (
                  <div className="bg-green-50 text-green-800 p-8 rounded-sm text-center space-y-4 border border-green-200">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-2xl font-serif">{t("product.order.success")}</h3>
                    <p className="font-sans">Our team will reach out to confirm your pre-order and delivery details.</p>
                  </div>
                ) : (
                  <form onSubmit={handleOrderSubmit} className="space-y-6 bg-card p-8 rounded-sm border border-border shadow-sm">
                    <h3 className="text-2xl font-serif mb-6">{t("product.order.title")}</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-sans">{t("product.order.name")}</Label>
                        <Input id="name" required className="rounded-none border-border bg-background h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-sans">{t("product.order.phone")}</Label>
                        <Input id="phone" type="tel" required className="rounded-none border-border bg-background h-12" />
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full h-14 rounded-none text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-sans mt-4">
                      {t("product.order.submit")}
                    </Button>
                  </form>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}