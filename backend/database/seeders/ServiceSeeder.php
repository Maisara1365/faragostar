<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [

            [
                'title_fa' => 'تولید تبلیغات ویدیویی',
                'title_en' => 'Video Advertisement Production',

                'slug' => 'video-advertisement-production',

                'short_description_fa' => 'تولید ویدیوهای تبلیغاتی حرفه‌ای برای برندها و کسب‌وکارها.',
                'short_description_en' => 'Professional promotional videos for brands and businesses.',

                'description_fa' =>
                    'تولید ویدیوهای تبلیغاتی شامل فیلمبرداری، تدوین سینمایی، موشن گرافیک، زیرنویس و گویندگی.',

                'description_en' =>
                    'Complete video advertisement production including promotional videos, commercial ads, cinematic editing, drone footage, motion graphics, subtitles and voice-over.',

                'icon' => 'services/video.svg',

                'starting_price' => 100,

                'display_order' => 1,

                'is_featured' => true,

                'theme_color' => '#183B73',

                'status' => 'active',
            ],


            [
                'title_fa' => 'طراحی گرافیک',
                'title_en' => 'Graphic Design',

                'slug' => 'graphic-design',

                'short_description_fa' => 'طراحی حرفه‌ای برای تبلیغات و برندینگ.',
                'short_description_en' => 'Creative graphic design solutions for businesses.',

                'description_fa' =>
                    'طراحی پوستر، بنر، کارت ویزیت، بروشور، کاتالوگ و محتوای شبکه‌های اجتماعی.',

                'description_en' =>
                    'Graphic design services including posters, banners, social media designs, business cards, brochures and catalogs.',

                'icon' => 'services/design.svg',

                'starting_price' => 50,

                'display_order' => 2,

                'is_featured' => true,

                'theme_color' => '#7C3AED',

                'status' => 'active',
            ],


            [
                'title_fa' => 'طراحی لوگو',
                'title_en' => 'Logo Design',

                'slug' => 'logo-design',

                'short_description_fa' => 'طراحی لوگوی منحصر به فرد برای هویت برند.',
                'short_description_en' => 'Unique logo designs for strong brand identity.',

                'description_fa' =>
                    'طراحی لوگوی مینیمال، لوکس، هویت سازمانی و فایل‌های اصلی.',

                'description_en' =>
                    'Minimal logos, luxury logos, corporate identity, transparent PNG files and source files.',

                'icon' => 'services/logo.svg',

                'starting_price' => 80,

                'display_order' => 3,

                'is_featured' => true,

                'theme_color' => '#F59E0B',

                'status' => 'active',
            ],


            [
                'title_fa' => 'طراحی وب سایت',
                'title_en' => 'Website Development',

                'slug' => 'website-development',

                'short_description_fa' => 'طراحی وب سایت‌های حرفه‌ای و چند زبانه.',
                'short_description_en' => 'Professional website development services.',

                'description_fa' =>
                    'طراحی سایت شرکتی، فروشگاهی، شخصی، چند زبانه و بهینه سازی SEO.',

                'description_en' =>
                    'Company websites, e-commerce websites, personal websites, multilingual websites and SEO optimization.',

                'icon' => 'services/web.svg',

                'starting_price' => 500,

                'display_order' => 4,

                'is_featured' => true,

                'theme_color' => '#059669',

                'status' => 'active',
            ],


            [
                'title_fa' => 'موشن گرافیک',
                'title_en' => 'Motion Graphics',

                'slug' => 'motion-graphics',

                'short_description_fa' => 'ساخت انیمیشن‌های تبلیغاتی حرفه‌ای.',
                'short_description_en' => 'Professional motion graphics and animations.',

                'description_fa' =>
                    'ساخت لوگوی متحرک، ویدیوهای توضیحی و طراحی متحرک شبکه‌های اجتماعی.',

                'description_en' =>
                    'Animated logos, explainer videos and social media motion designs.',

                'icon' => 'services/motion.svg',

                'starting_price' => 150,

                'display_order' => 5,

                'is_featured' => false,

                'theme_color' => '#DC2626',

                'status' => 'active',
            ],


            [
                'title_fa' => 'خدمات چاپ',
                'title_en' => 'Printing Services',

                'slug' => 'printing-services',

                'short_description_fa' => 'خدمات چاپ دیجیتال و افست.',
                'short_description_en' => 'Professional printing solutions.',

                'description_fa' =>
                    'چاپ دیجیتال، چاپ افست، بنر، استیکر و تابلوهای تبلیغاتی.',

                'description_en' =>
                    'Digital printing, offset printing, flex banners, stickers and signboards.',

                'icon' => 'services/printing.svg',

                'starting_price' => 30,

                'display_order' => 6,

                'is_featured' => false,

                'theme_color' => '#2563EB',

                'status' => 'active',
            ],


            [
                'title_fa' => 'بازاریابی دیجیتال',
                'title_en' => 'Digital Marketing',

                'slug' => 'digital-marketing',

                'short_description_fa' => 'رشد برند شما در فضای دیجیتال.',
                'short_description_en' => 'Grow your business through digital marketing.',

                'description_fa' =>
                    'بازاریابی فیسبوک، اینستاگرام، برندینگ و مدیریت کمپین‌ها.',

                'description_en' =>
                    'Facebook marketing, Instagram marketing, branding and campaign management.',

                'icon' => 'services/marketing.svg',

                'starting_price' => 200,

                'display_order' => 7,

                'is_featured' => true,

                'theme_color' => '#9333EA',

                'status' => 'active',
            ],

        ];


        foreach ($services as $service) {

            Service::create($service);

        }
    }
}
