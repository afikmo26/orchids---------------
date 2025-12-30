"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  CheckCircle2, 
  Layers, 
  Phone, 
  ShieldCheck,
  Clock,
  Construction,
  Hammer,
  ArrowLeft,
  MessageCircle,
  ChevronDown,
  Quote
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { SparkEffect } from "@/components/SparkEffect";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { motion, AnimatePresence } from "framer-motion";

const scrollReveal = {
  initial: { opacity: 0, y: 100, scale: 0.8, rotate: -5, skewX: -10 },
  whileInView: { opacity: 1, y: 0, scale: 1, rotate: 0, skewX: 0 },
  viewport: { once: false, margin: "-100px" },
  transition: { 
    type: "spring",
    stiffness: 70,
    damping: 15,
    duration: 1 
  }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  },
  viewport: { once: false }
};

const slideFromLeft = {
  initial: { opacity: 0, x: -150, skewX: -15, rotate: -5 },
  whileInView: { opacity: 1, x: 0, skewX: 0, rotate: 0 },
  viewport: { once: false },
  transition: { duration: 1, ease: "easeOut" }
};

const slideFromRight = {
  initial: { opacity: 0, x: 150, skewX: 15, rotate: 5 },
  whileInView: { opacity: 1, x: 0, skewX: 0, rotate: 0 },
  viewport: { once: false },
  transition: { duration: 1, ease: "easeOut" }
};

export default function Home() {
  const [showSplash, setShowSplash] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  
  const phoneNumbers = [
    "054-568-7588",
    "052-783-2665",
    "054-528-9488"
  ];
  const phoneNumber = phoneNumbers[0];
  const email = "AFIKMO26@GMAIL.COM";
  const companyName = "לי מתכות";
  const brandSubtext = "מומחים בבנייה ומסגרות ברמה הגבוהה ביותר";
  const logoUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/5781fdf5-42d8-4372-a8f6-bbe014e74177-1767019453245.jfif";
  const heroImageUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/7e5bed2b-8d3c-4d83-a3c9-0ca9968e2807-1767018142445.jpg?width=8000&height=8000&resize=contain";

  const faqs = [
    {
      question: "כמה שנות ניסיון יש לכם בעבודה מול קבלני שלד?",
      answer: "אנחנו עסק משפחתי עם 60 שנות ניסיון שעוברות מאב לבן. עבדנו עם מאות קבלני שלד לאורך השנים, ואנחנו יודעים בדיוק איך להשתלב בלוח הזמנים של האתר כדי לא לעכב אף אחד."
    },
    {
      question: "מה רמת הדיוק שאתם מתחייבים אליה במסגרות?",
      answer: "אנחנו עובדים עם סטייה של מילימטרים בודדים בלבד. כל עבודת קונסטרוקציה, מעקה או שער עוברת בקרה קפדנית. הדיוק שלנו הוא השקט התעשייתי של הקבלן בשלבי הגמר."
    },
    {
      question: "האם אתם מספקים אישורים וביטוחים לכל עבודה?",
      answer: "בוודאי. כל העבודות שלנו מבוצעות לפי תקני הבטיחות המחמירים ביותר, כולל כל האישורים הנדרשים וביטוח קבלני מלא. בטיחות היא מעל הכל אצלנו."
    },
    {
      question: "אתם מבצעים פרויקטים 'עד מפתח' גם עבור לקוחות פרטיים?",
      answer: "כן, אנחנו מתמחים בליווי פרויקטים משלב היסודות ועד למסירת המפתח. אנחנו מנהלים את כל שלבי הבנייה והשיפוץ, כולל תיאום מלא מול כל בעלי המקצוע."
    },
    {
      question: "איך נראה תהליך העבודה מול אדריכלים ומעצבים?",
      answer: "אנחנו מדברים בשפה שלכם. אנחנו יודעים לקרוא תוכניות מורכבות, להציע פתרונות טכניים לאתגרים עיצוביים ולבצע בדיוק מה ששורטט, בלי קיצורי דרך."
    }
  ];

  const testimonials = [
    {
      text: "הדיוק במסגרות שהם סיפקו לי בפרויקט האחרון היה פשוט מדהים. כקבלן, אני יודע ש-60 שנות ניסיון זה לא רק מספר – זה שקט נפשי באתר.",
      author: "אבי כהן",
      role: "קבלן שלד"
    },
    {
      text: "הם לקחו לי את כל הבנייה מהשלד ועד המפתח. רמה גבוהה של גימור, עמידה בלוחות זמנים ויחס אישי. הכי טובים בתחום.",
      author: "משה לוי",
      role: "בעל וילה בקיסריה"
    },
    {
      text: "עבודות המסגרות המיוחדות שהם עשו לנו במשרדים קיבלו מחמאות מכל לקוח שנכנס. מקצוענות אמיתית ודיוק של שעון שוויצרי.",
      author: "רונית גרינברג",
      role: "אדריכלית"
    }
  ];

  React.useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 font-sans" dir="rtl">
      <SparkEffect />
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="splash"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="relative z-20 flex flex-col items-center"
            >
              <div className="mb-8 relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-2xl">
                <Image src={logoUrl} alt="Logo" fill className="object-cover" priority sizes="128px" />
              </div>
              <h1 className="text-5xl font-bold tracking-tighter text-white md:text-7xl">
                לי <span className="text-primary">מתכות</span>
              </h1>
              <p className="mt-4 text-xl font-bold text-zinc-400 uppercase tracking-[0.2em]">
                {brandSubtext}
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <main>
              {/* Hero Section */}
              <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
                <motion.div 
                  initial={{ scale: 1.5, opacity: 0, rotate: 5 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                  className="absolute inset-0 z-0"
                >
                  <Image 
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/7e5bed2b-8d3c-4d83-a3c9-0ca9968e2807-1767018142445.jpg?width=8000&height=8000&resize=contain"
                    alt="Background"
                    fill
                    className="object-cover brightness-[0.4]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                </motion.div>
                
                <div className="container relative z-10 mx-auto px-4 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="mb-8 inline-block rounded-full border border-primary/30 bg-primary/10 px-6 py-2 text-sm font-bold text-primary backdrop-blur-sm"
                  >
                    {companyName} – 60 שנות ניסיון ותוצאות בשטח
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 100, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mb-6 text-5xl font-bold tracking-tight text-white md:text-8xl"
                  >
                    מומחים בבנייה, <br />
                    <span className="text-primary underline decoration-white/10 underline-offset-[15px]">שיפוצים ומסגרות</span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="mx-auto mb-10 max-w-3xl text-xl font-bold text-zinc-300 md:text-3xl"
                  >
                    בונים בית עד מפתח | קבלנות שיפוצים | עבודות מסגרות מתקדמות <br />
                    <span className="mt-6 block text-white font-bold text-2xl md:text-5xl uppercase tracking-tighter">איכות. מקצועיות. דיוק.</span>
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-6"
                  >
                    <Button size="lg" className="h-20 bg-primary px-12 text-2xl font-bold hover:bg-red-700 text-white shadow-xl rounded-2xl transform hover:scale-105 transition-transform" asChild>
                      <Link href="#contact">קבלו הצעת מחיר</Link>
                    </Button>
                    <Button size="lg" variant="secondary" className="h-20 px-12 text-2xl font-bold bg-white text-black hover:bg-zinc-200 rounded-2xl transform hover:scale-105 transition-transform" asChild>
                      <a href={`tel:${phoneNumbers[0].replace(/-/g, '')}`}>דברו איתנו עכשיו</a>
                    </Button>
                  </motion.div>
                </div>
              </section>

              {/* Intro Section */}
              <section className="bg-zinc-950 py-32 border-y border-white/5">
                <div className="container mx-auto px-4">
                  <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
                    <motion.div {...slideFromRight} className="text-right">
                      <h2 className="mb-12 text-5xl font-bold md:text-7xl">
                        אנחנו <span className="text-primary">מובילים באיכות ובדיוק</span>
                      </h2>
                      <div className="space-y-8 text-xl leading-relaxed text-zinc-400 font-medium md:text-3xl">
                        <p>
                          חברת "לי מתכות" מתמחה בכל תחומי הבנייה, השיפוצים והמסגרות, עם 60 שנות ניסיון משפחתי מוכח, סטנדרט עבודה גבוה ויחס אישי לכל לקוח.
                        </p>
                        <motion.div 
                          variants={staggerContainer}
                          initial="initial"
                          whileInView="whileInView"
                          viewport={{ once: true }}
                          className="grid gap-8 md:grid-cols-2 mt-16"
                        >
                           <motion.div variants={scrollReveal} className="p-8 rounded-3xl bg-zinc-900 border border-white/5 shadow-xl flex flex-col items-center text-center">
                              <Clock className="text-primary mb-4" size={40} />
                              <span className="text-white font-bold text-2xl">שעות פעילות</span>
                              <span className="text-zinc-400 text-xl">05:00 - 16:00 (כל ימי השבוע)</span>
                           </motion.div>
                           <motion.div variants={scrollReveal} className="p-8 rounded-3xl bg-zinc-900 border border-white/5 shadow-xl flex flex-col items-center text-center">
                              <ShieldCheck className="text-primary mb-4" size={40} />
                              <span className="text-white font-bold text-2xl">ניסיון ומקצועיות</span>
                              <span className="text-zinc-400 text-xl">60 שנה בתחום המסגרות והבנייה</span>
                           </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                    <motion.div 
                      {...slideFromLeft}
                      className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 shadow-2xl group"
                    >
                      <Image 
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/c1e188de-74b5-4e46-a4d8-1f5e2f07d3bc-1767018099667.jpg?width=8000&height=8000&resize=contain"
                        alt="Professional Metalwork"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section id="about" className="py-32 bg-black">
                <div className="container mx-auto px-4">
                  <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
                    <motion.div {...slideFromRight}>
                      <div className="mb-8 inline-flex items-center gap-2 rounded-xl bg-primary/10 px-5 py-3 text-lg font-bold text-primary border border-primary/20">
                        <ShieldCheck size={24} />
                        מי אנחנו
                      </div>
                      <h2 className="mb-10 text-5xl font-bold md:text-7xl leading-none">מי אנחנו – <br/><span className="text-primary">60 שנות מצוינות</span></h2>
                      <div className="space-y-8 text-xl text-zinc-400 font-medium">
                        <p>
                          {companyName} היא חברת ביצוע וקבלנות המתמחה בפרויקטים פרטיים ומסחריים בתחום הבנייה, השיפוצים והמסגרות.
                          אנו מלווים את הלקוח משלב התכנון ועד קבלת מפתח – תוך הקפדה על איכות חומרים, עבודה מדויקת ושקיפות מלאה.
                        </p>
                        <p className="font-bold text-white text-2xl border-r-4 border-primary pr-6">
                          60 שנה של מסורת משפחתית, דיוק ומקצוענות ללא פשרות.
                        </p>
                      </div>
                      
                      <motion.div 
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="mt-16 grid gap-6 sm:grid-cols-2"
                      >
                        {[
                          "עבודה לפי תקנים מחמירים",
                          "עמידה בלוחות זמנים",
                          "צוות מקצועי ומנוסה",
                          "ליווי אישי וצמוד",
                          "פתרונות מותאמים אישית"
                        ].map((item, i) => (
                          <motion.div 
                            key={i} 
                            variants={scrollReveal}
                            className="flex items-center gap-5 rounded-2xl bg-zinc-900 p-6 border border-white/5 hover:border-primary/30 transition-all group"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shrink-0 group-hover:scale-110 transition-transform">
                              <CheckCircle2 size={20} />
                            </div>
                            <span className="font-bold text-xl text-white">{item}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      {...slideFromLeft}
                      className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
                    >
                      <Image 
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/56955924-c98f-49b3-bd9f-da23b0b1c67d-1767018130576.jpg?width=8000&height=8000&resize=contain"
                        alt="Work in progress"
                        fill
                        className="object-cover transition-transform duration-1000 hover:scale-105"
                      />
                      <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-8 right-8 rounded-2xl bg-black/90 p-8 backdrop-blur-xl border border-white/10 shadow-2xl"
                      >
                        <div className="text-6xl font-bold text-primary">60</div>
                        <div className="text-2xl font-bold text-white">שנות ניסיון</div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Services Section */}
              <section id="services" className="bg-zinc-950 py-32 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                  <Image 
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/01a87860-ce33-4b8f-8c13-899ebc8b2827-1767018106699.jpg?width=8000&height=8000&resize=contain" 
                    alt="Background" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                  <motion.div {...scrollReveal} className="mb-24 text-center">
                    <h2 className="mb-6 text-6xl font-bold md:text-8xl">השירותים שלנו</h2>
                    <p className="mx-auto max-w-2xl text-2xl font-bold text-primary uppercase tracking-widest">הכל תחת קורת גג אחת</p>
                  </motion.div>

                  <motion.div 
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    className="grid gap-8 md:grid-cols-3"
                  >
                    <motion.div variants={scrollReveal}>
                      <div className="group h-full rounded-3xl border border-white/5 bg-black p-10 transition-all hover:border-primary/30">
                        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white shadow-xl group-hover:scale-110 transition-transform">
                          <Construction size={40} />
                        </div>
                        <h3 className="mb-6 text-3xl font-bold text-white">בנייה עד מפתח</h3>
                        <p className="mb-8 text-lg text-zinc-400 font-medium">בנייה פרטית ומלאה משלב האפס ועד קבלת מפתח</p>
                        <ul className="space-y-4">
                          {["בניית בתים פרטיים", "תוספות בנייה", "שלד וגמר", "ניהול ופיקוח פרויקט", "תיאום בין כל בעלי המקצוע"].map((item) => (
                            <li key={item} className="flex items-center gap-4 text-xl font-bold text-zinc-200">
                              <CheckCircle2 className="text-primary" size={24} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    <motion.div variants={scrollReveal}>
                      <div className="group h-full rounded-3xl border border-white/5 bg-black p-10 transition-all hover:border-primary/30">
                        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white shadow-xl group-hover:scale-110 transition-transform">
                          <Hammer size={40} />
                        </div>
                        <h3 className="mb-6 text-3xl font-bold text-white">קבלנות שיפוצים</h3>
                        <p className="mb-8 text-lg text-zinc-400 font-medium">שיפוצים ברמה אחרת – מהיסוד ועד הפרטים הקטנים</p>
                        <ul className="space-y-4">
                          {["שיפוץ דירות", "שיפוץ בתים פרטיים", "שיפוץ משרדים וחנויות", "שיפוץ כללי / חלקי", "עבודות גמר ברמה גבוהה"].map((item) => (
                            <li key={item} className="flex items-center gap-4 text-xl font-bold text-zinc-200">
                              <CheckCircle2 className="text-primary" size={24} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    <motion.div variants={scrollReveal}>
                      <div className="group h-full rounded-3xl border border-white/5 bg-black p-10 transition-all hover:border-primary/30">
                        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white shadow-xl group-hover:scale-110 transition-transform">
                          <Layers size={40} />
                        </div>
                        <h3 className="mb-6 text-3xl font-bold text-white">עבודות מסגרות</h3>
                        <p className="mb-8 text-lg text-zinc-400 font-medium">מסגרות מתקדמות בהתאמה אישית</p>
                        <ul className="space-y-4">
                          {["מעקות ומדרגות ברזל", "שערים וגדרות", "קונסטרוקציות ברזל", "עבודות מסגרות מיוחדות", "תיקוני מסגרות"].map((item) => (
                            <li key={item} className="flex items-center gap-4 text-xl font-bold text-zinc-200">
                              <CheckCircle2 className="text-primary" size={24} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              {/* Gallery Section */}
              <section id="projects" className="py-32 bg-black">
                <div className="container mx-auto px-4">
                  <motion.div {...scrollReveal} className="mb-24 text-center">
                    <h2 className="mb-8 text-6xl font-bold md:text-8xl text-white">הפרויקטים שלנו</h2>
                    <p className="mx-auto max-w-3xl text-2xl font-bold text-primary mt-8 leading-relaxed italic">
                      "תמונות מהשטח – עבודות אמיתיות שלנו"
                    </p>
                  </motion.div>

                  <motion.div 
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {[
                      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/c1e188de-74b5-4e46-a4d8-1f5e2f07d3bc-1767018099667.jpg?width=8000&height=8000&resize=contain",
                      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/01a87860-ce33-4b8f-8c13-899ebc8b2827-1767018106699.jpg?width=8000&height=8000&resize=contain",
                      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/56955924-c98f-49b3-bd9f-da23b0b1c67d-1767018130576.jpg?width=8000&height=8000&resize=contain",
                      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/a7d1d3e3-591e-4cc7-b563-91ce8dbe7244-1767017834960.jpg?width=8000&height=8000&resize=contain"
                    ].map((src, i) => (
                      <motion.div 
                        key={i} 
                        variants={scrollReveal}
                        onClick={() => setSelectedImage(src)}
                        className="group relative aspect-square overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 shadow-xl cursor-pointer"
                        role="button"
                        aria-label="הגדל תמונה"
                      >
                        <Image
                          src={src}
                          alt={`פרויקט ${i + 1}`}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center opacity-0 transition-all duration-500 group-hover:opacity-100 bg-black/40 backdrop-blur-sm">
                          <p className="text-xl font-bold text-white mb-2">עבודת מסגרות וביצוע</p>
                          <p className="text-lg font-bold text-primary">{companyName}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="py-32 bg-zinc-950 border-y border-white/5">
                <div className="container mx-auto px-4">
                  <motion.div {...scrollReveal} className="mb-20 text-center">
                    <h2 className="mb-6 text-5xl font-bold md:text-7xl">שאלות <span className="text-primary">נפוצות</span></h2>
                    <p className="mx-auto max-w-2xl text-2xl font-bold text-zinc-400">כל מה שקבלנים ולקוחות רוצים לדעת</p>
                  </motion.div>

                  <div className="mx-auto max-w-4xl space-y-4">
                    {faqs.map((faq, i) => (
                      <motion.div
                        key={i}
                        variants={scrollReveal}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-lg"
                      >
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="flex w-full items-center justify-between p-8 text-right transition-colors hover:bg-zinc-900"
                        >
                          <span className="text-2xl font-bold text-white">{faq.question}</span>
                          <ChevronDown 
                            className={`text-primary transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} 
                            size={28} 
                          />
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="border-t border-white/5 p-8 text-xl leading-relaxed text-zinc-400 font-medium">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Testimonials Section */}
              <section className="py-32 bg-black overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                  <div className="absolute top-10 left-10 text-primary rotate-12"><Quote size={200} /></div>
                  <div className="absolute bottom-10 right-10 text-primary -rotate-12 opacity-50"><Quote size={200} /></div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                  <motion.div {...scrollReveal} className="mb-20 text-center">
                    <h2 className="mb-6 text-5xl font-bold md:text-7xl">לקוחות <span className="text-primary">מרוצים</span></h2>
                    <p className="mx-auto max-w-2xl text-2xl font-bold text-zinc-400">מה אומרים עלינו בשטח</p>
                  </motion.div>

                  <motion.div 
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    className="grid gap-8 md:grid-cols-3"
                  >
                    {testimonials.map((t, i) => (
                      <motion.div
                        key={i}
                        variants={scrollReveal}
                        className="relative rounded-3xl border border-white/10 bg-zinc-900/50 p-10 backdrop-blur-sm hover:border-primary/30 transition-all group"
                      >
                        <Quote className="mb-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" size={40} />
                        <p className="mb-10 text-xl leading-relaxed text-white font-bold italic">
                          "{t.text}"
                        </p>
                        <div className="flex items-center gap-4 border-t border-white/10 pt-8">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-xl">
                            {t.author[0]}
                          </div>
                          <div>
                            <p className="text-xl font-bold text-white">{t.author}</p>
                            <p className="text-lg font-bold text-primary">{t.role}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    {...scrollReveal}
                    className="mt-20 flex flex-col items-center justify-center rounded-3xl bg-primary/10 border border-primary/20 p-12 text-center"
                  >
                    <h3 className="mb-6 text-3xl font-bold text-white md:text-4xl">הצטרפו למאות לקוחות מרוצים</h3>
                    <p className="mb-10 text-xl text-zinc-300 font-medium max-w-2xl">
                      עם 60 שנה של ניסיון, אנחנו יודעים בדיוק איך להפוך את החזון שלכם למציאות בשטח.
                    </p>
                    <Button size="lg" className="h-20 bg-primary px-12 text-2xl font-bold hover:bg-red-700 text-white shadow-xl rounded-2xl" asChild>
                      <Link href="#contact">בואו נדבר</Link>
                    </Button>
                  </motion.div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="relative bg-zinc-950 py-32">
                <div className="container mx-auto px-4">
                  <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
                    <motion.div {...slideFromRight}>
                      <h2 className="mb-10 text-6xl font-bold text-white md:text-8xl leading-tight">דברו <br/><span className="text-primary">איתנו</span></h2>
                      <div className="space-y-12">
                        <a href={`tel:${phoneNumber.replace(/-/g, '')}`} className="group flex items-center gap-8">
                          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white shadow-xl transition-all group-hover:scale-110">
                            <Phone size={40} />
                          </div>
                          <div>
                            <p className="text-xl font-bold text-white opacity-60">התקשרו אלינו / וואטסאפ</p>
                            <p className="text-4xl font-bold text-primary dir-ltr tracking-tighter">{phoneNumber}</p>
                          </div>
                        </a>
                        <div className="flex items-center gap-8">
                          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-xl">
                            <Clock size={40} />
                          </div>
                          <div>
                            <p className="text-xl font-bold text-white opacity-60">שעות פעילות</p>
                            <p className="text-2xl font-bold text-white uppercase tracking-tighter">05:00 - 16:00 | כל ימי השבוע</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      {...slideFromLeft} 
                      className="relative rounded-3xl border border-white/5 bg-black p-10 shadow-2xl md:p-16"
                    >
                      <h3 className="text-3xl font-bold text-white mb-12 text-center">השאירו פרטים ונחזור אליכם</h3>
                      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid gap-8 md:grid-cols-2">
                          <div className="space-y-3">
                            <Label htmlFor="name" className="text-xl font-bold text-white mr-2">שם מלא</Label>
                            <Input id="name" placeholder="שמך המלא" className="h-16 border-white/10 bg-zinc-900 text-right text-xl font-bold focus:border-primary rounded-xl px-6" />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="phone" className="text-xl font-bold text-white mr-2">טלפון</Label>
                            <Input id="phone" placeholder="מספר נייד" className="h-16 border-white/10 bg-zinc-900 text-right text-xl font-bold focus:border-primary rounded-xl px-6" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="message" className="text-xl font-bold text-white mr-2">הודעה</Label>
                          <Textarea id="message" placeholder="איך נוכל לעזור?" className="min-h-[200px] border-white/10 bg-zinc-900 text-right text-xl font-bold focus:border-primary rounded-2xl p-8" />
                        </div>
                        <Button size="lg" className="w-full h-20 bg-primary text-2xl font-bold hover:bg-red-700 shadow-xl rounded-2xl transition-all active:scale-95">
                          שלחו הודעה עכשיו <ArrowLeft className="mr-4" size={32} />
                        </Button>
                      </form>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="border-t-4 border-primary bg-black py-24 text-zinc-500 overflow-hidden relative">
                <div className="container mx-auto px-4 relative z-10">
                  <div className="grid gap-16 md:grid-cols-3">
                    <div>
                      <Link href="/" className="mb-8 flex items-center gap-3 text-4xl font-bold tracking-tighter text-white">
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-white">
                          <Image src={logoUrl} alt="Footer Logo" fill className="object-cover" />
                        </div>
                        <span>לי <span className="text-primary">מתכות</span></span>
                      </Link>
                      <p className="max-w-md text-xl leading-relaxed font-bold text-zinc-400">
                        60 שנה של ניסיון בבנייה, שיפוצים ומסגרות. איכות ללא פשרות.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="mb-8 text-2xl font-bold text-white underline decoration-primary underline-offset-8">ניווט</h4>
                      <ul className="space-y-4 text-xl font-bold">
                        <li><Link href="#home" className="hover:text-primary transition-colors">בית</Link></li>
                        <li><Link href="#about" className="hover:text-primary transition-colors">מי אנחנו</Link></li>
                        <li><Link href="#services" className="hover:text-primary transition-colors">שירותים</Link></li>
                        <li><Link href="#projects" className="hover:text-primary transition-colors">פרויקטים</Link></li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="mb-8 text-2xl font-bold text-white underline decoration-primary underline-offset-8">צור קשר</h4>
                      <ul className="space-y-4 text-xl font-bold text-zinc-400">
                        <li className="dir-ltr hover:text-primary transition-colors"><a href={`tel:${phoneNumber.replace(/-/g, '')}`}>{phoneNumber}</a></li>
                        <li className="hover:text-primary transition-colors underline underline-offset-4"><a href={`mailto:${email}`}>{email}</a></li>
                        <li>05:00 - 16:00 (כל ימי השבוע)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </footer>

              {/* Floating WhatsApp */}
              <a 
                href="https://wa.me/message/EUDD6TVNMC37K1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="fixed bottom-10 right-10 z-[60] flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_40px_rgba(220,38,38,0.6)] hover:scale-110 transition-transform animate-pulse"
              >
                <MessageCircle size={40} fill="white" />
              </a>

              {/* Accessibility Widget */}
              <AccessibilityWidget />

              {/* Lightbox */}
              <AnimatePresence>
                {selectedImage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedImage(null)}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10 cursor-zoom-out"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="relative h-full w-full max-w-6xl overflow-hidden rounded-3xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        src={selectedImage}
                        alt="Enlarged project"
                        fill
                        className="object-contain"
                        priority
                      />
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 left-6 flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-primary transition-colors"
                        aria-label="סגור תמונה"
                      >
                        <ArrowLeft className="rotate-180" size={32} />
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
