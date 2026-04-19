import { useState, type FormEvent } from "react";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Role = "seller" | "buyer" | "learner";

const roles: Role[] = ["seller", "buyer", "learner"];

export default function Register() {
  const { t, dir } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<Role>("buyer");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-16 md:py-24">
        <div className="container mx-auto px-4" dir={dir}>
          <div className="mx-auto mb-12 max-w-3xl text-center space-y-5 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-4xl font-extrabold text-primary md:text-5xl break-words">{t("register.title")}</h1>
            <p className="text-lg leading-9 text-muted-foreground">{t("register.subtitle")}</p>
            <div className="mx-auto h-1.5 w-16 rounded-full bg-accent" />
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="grid gap-4">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`story-card rounded-3xl p-6 text-start transition-all duration-300 hover:-translate-y-1 ${
                    selectedRole === role ? "border-primary bg-primary/8 shadow-xl" : ""
                  }`}
                >
                  <h2 className="text-2xl font-extrabold text-primary">{t(`register.${role}`)}</h2>
                  <p className="mt-3 leading-8 text-muted-foreground">{t(`register.${role}.desc`)}</p>
                </button>
              ))}
            </section>

            <section className="story-card rounded-3xl p-7 md:p-8">
              {submitted ? (
                <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-700">✓</div>
                  <h2 className="text-3xl font-extrabold text-primary">{t("register.success")}</h2>
                  <p className="mt-4 max-w-md leading-8 text-muted-foreground">{t("register.successNote")}</p>
                  <Button onClick={() => setSubmitted(false)} className="mt-8 rounded-2xl bg-primary px-8 text-primary-foreground">
                    {t("nav.register")}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-widest text-muted-foreground">{t("register.role")}</p>
                    <h2 className="mt-2 text-3xl font-extrabold text-primary">{t(`register.${selectedRole}`)}</h2>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">{t("register.name")}</Label>
                      <Input id="register-name" required className="h-12 rounded-2xl bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-phone">{t("register.phone")}</Label>
                      <Input id="register-phone" type="tel" required className="h-12 rounded-2xl bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">{t("register.email")}</Label>
                      <Input id="register-email" type="email" className="h-12 rounded-2xl bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-city">{t("register.city")}</Label>
                      <Input id="register-city" required className="h-12 rounded-2xl bg-background" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-message">{t("register.message")}</Label>
                    <Textarea
                      id="register-message"
                      placeholder={t("register.message.placeholder")}
                      className="min-h-32 rounded-2xl bg-background"
                    />
                  </div>

                  <Button type="submit" className="h-14 w-full rounded-2xl bg-primary text-lg font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90">
                    {t("register.submit")}
                  </Button>
                </form>
              )}
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}