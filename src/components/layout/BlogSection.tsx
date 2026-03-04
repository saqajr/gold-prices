// gold-prices-portal/src/components/layout/BlogSection.tsx
import React from 'react';
import Link from 'next/link';
import { blogs } from '@/lib/blogs';
import { ArrowLeft } from 'lucide-react';

export default function BlogSection() {
    const featured = blogs.slice(0, 3);

    return (
        <section className="py-12 border-t border-slate-100 mt-20">
            <div className="flex justify-between items-end mb-10">
                <div className="text-right">
                    <h2 className="text-3xl font-black text-slate-900 mb-2">أخبار وتوقعات الذهب</h2>
                    <p className="text-slate-500 font-bold">كل ما تحتاج معرفته عن سوق الذهب في مكان واحد</p>
                </div>
                <Link
                    href="/blog"
                    className="flex items-center gap-2 text-gold font-black text-sm hover:gap-4 transition-all"
                >
                    عرض الكل
                    <ArrowLeft size={14} className="rotate-180" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featured.map((blog) => (
                    <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group block">
                        <div className="relative h-64 w-full mb-6 rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-gold border border-gold/10">
                                {blog.tag}
                            </div>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-gold transition-colors">{blog.title}</h3>
                        <p className="text-slate-400 text-xs font-black mb-2">{blog.date}</p>
                        <p className="text-slate-500 text-sm leading-relaxed font-bold">{blog.description}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
