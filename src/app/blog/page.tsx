// gold-prices-portal/src/app/blog/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { blogs } from '@/lib/blogs';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'مدونة الذهب | أخبار وتوقعات السوق',
    description: 'تابع أحدث أخبار الذهب والفضة والتوقعات الاقتصادية. نصائح الخبراء وتحليلات الأسواق.',
};

export default function BlogPage() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <section className="text-right p-8 md:p-14 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold/20 to-transparent opacity-60" />
                <div className="relative z-10">
                    <p className="text-gold font-black text-xs uppercase tracking-[0.2em] mb-4">المدوّنة</p>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">أخبار وتوقعات الذهب</h1>
                    <p className="text-slate-400 font-bold text-lg max-w-xl">
                        كل ما تحتاج معرفته عن سوق الذهب والفضة في مكان واحد
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group block">
                        <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                            <div className="relative h-56 overflow-hidden bg-slate-50">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-gold border border-gold/10">
                                    {blog.tag}
                                </div>
                            </div>
                            <div className="p-7 flex flex-col flex-1">
                                <p className="text-slate-400 text-xs font-black mb-3">{blog.date}</p>
                                <h2 className="text-xl font-black text-slate-900 mb-3 group-hover:text-gold transition-colors leading-snug">
                                    {blog.title}
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed font-bold flex-1">{blog.description}</p>
                                <div className="flex items-center gap-2 text-gold font-black text-sm mt-6 group-hover:gap-4 transition-all">
                                    <span>اقرأ المزيد</span>
                                    <ArrowLeft size={16} className="rotate-180" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
