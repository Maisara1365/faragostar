<?php

namespace Database\Seeders;

use App\Models\Package;
use App\Models\Service;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Service IDs
        |--------------------------------------------------------------------------
        */

        $video = Service::where('slug', 'video-advertisement-production')->first();
        $graphic = Service::where('slug', 'graphic-design')->first();
        $logo = Service::where('slug', 'logo-design')->first();

        /*
        |--------------------------------------------------------------------------
        | Video Advertisement Production
        |--------------------------------------------------------------------------
        */

        Package::create([
            'service_id' => $video->id,
            'name_fa' => 'پکیج پایه',
            'name_en' => 'Basic Package',
            'description_fa' => 'مناسب برای کسب‌وکارهای کوچک و استارتاپ‌ها.',
            'description_en' => 'Ideal for startups and small businesses.',
            'price' => 100,
            'delivery_days' => 3,
            'revisions' => 1,
            'features_fa' => [
                'ویدیوی تبلیغاتی تا ۳۰ ثانیه',
                'فیلمبرداری زمینی',
                'تدوین استاندارد',
                'خروجی Full HD',
            ],
            'features_en' => [
                'Up to 30-second promotional video',
                'Ground shooting',
                'Standard editing',
                'Full HD export',
            ],
            'display_order' => 1,
            'is_featured' => false,
            'status' => 'active',
        ]);

        Package::create([
            'service_id' => $video->id,
            'name_fa' => 'پکیج استاندارد',
            'name_en' => 'Standard Package',
            'description_fa' => 'بهترین انتخاب برای اکثر شرکت‌ها.',
            'description_en' => 'Recommended for growing businesses.',
            'price' => 250,
            'delivery_days' => 5,
            'revisions' => 2,
            'features_fa' => [
                'ویدیوی ۶۰ ثانیه‌ای',
                'فیلمبرداری زمینی',
                'تدوین سینمایی',
                'موشن گرافیک',
                'زیرنویس',
            ],
            'features_en' => [
                '60-second commercial video',
                'Ground shooting',
                'Cinematic editing',
                'Motion graphics',
                'Subtitles',
            ],
            'display_order' => 2,
            'is_featured' => true,
            'status' => 'active',
        ]);

        Package::create([
            'service_id' => $video->id,
            'name_fa' => 'پکیج ویژه',
            'name_en' => 'Premium Package',
            'description_fa' => 'راهکار کامل تبلیغات ویدیویی.',
            'description_en' => 'Complete premium video production solution.',
            'price' => 500,
            'delivery_days' => 7,
            'revisions' => 5,
            'features_fa' => [
                'فیلمبرداری با پهپاد',
                'فیلمبرداری زمینی',
                'تدوین سینمایی',
                'موشن گرافیک',
                'گویندگی',
                'زیرنویس',
                'نسخه مناسب شبکه‌های اجتماعی',
            ],
            'features_en' => [
                'Drone footage',
                'Ground shooting',
                'Cinematic editing',
                'Motion graphics',
                'Professional voice-over',
                'Subtitles',
                'Social media versions',
            ],
            'display_order' => 3,
            'is_featured' => false,
            'status' => 'active',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Graphic Design
        |--------------------------------------------------------------------------
        */

        Package::create([
            'service_id' => $graphic->id,
            'name_fa' => 'پکیج پایه',
            'name_en' => 'Basic Package',
            'description_fa' => 'طراحی ساده و حرفه‌ای.',
            'description_en' => 'Professional basic graphic design.',
            'price' => 40,
            'delivery_days' => 2,
            'revisions' => 2,
            'features_fa' => [
                'پوستر',
                'بنر',
                'فرمت PNG',
            ],
            'features_en' => [
                'Poster design',
                'Banner design',
                'PNG format',
            ],
            'display_order' => 1,
            'is_featured' => false,
            'status' => 'active',
        ]);

        Package::create([
            'service_id' => $graphic->id,
            'name_fa' => 'پکیج استاندارد',
            'name_en' => 'Standard Package',
            'description_fa' => 'مناسب برای برندهای در حال رشد.',
            'description_en' => 'Perfect for growing brands.',
            'price' => 80,
            'delivery_days' => 3,
            'revisions' => 3,
            'features_fa' => [
                'پوستر',
                'بنر',
                'پست شبکه اجتماعی',
                'کارت ویزیت',
            ],
            'features_en' => [
                'Poster',
                'Banner',
                'Social media design',
                'Business card',
            ],
            'display_order' => 2,
            'is_featured' => true,
            'status' => 'active',
        ]);

        Package::create([
            'service_id' => $graphic->id,
            'name_fa' => 'پکیج ویژه',
            'name_en' => 'Premium Package',
            'description_fa' => 'راهکار کامل طراحی گرافیک.',
            'description_en' => 'Complete graphic design solution.',
            'price' => 150,
            'delivery_days' => 5,
            'revisions' => 5,
            'features_fa' => [
                'پوستر',
                'بنر',
                'کاتالوگ',
                'بروشور',
                'طراحی شبکه اجتماعی',
                'فایل لایه باز',
            ],
            'features_en' => [
                'Poster',
                'Banner',
                'Catalog',
                'Brochure',
                'Social media designs',
                'Source files',
            ],
            'display_order' => 3,
            'is_featured' => false,
            'status' => 'active',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Logo Design
        |--------------------------------------------------------------------------
        */

        Package::create([
            'service_id' => $logo->id,
            'name_fa' => 'پکیج پایه',
            'name_en' => 'Basic Package',
            'description_fa' => 'لوگوی مینیمال.',
            'description_en' => 'Minimal logo design.',
            'price' => 60,
            'delivery_days' => 2,
            'revisions' => 2,
            'features_fa' => [
                'یک طرح لوگو',
                'PNG شفاف',
            ],
            'features_en' => [
                'One logo concept',
                'Transparent PNG',
            ],
            'display_order' => 1,
            'is_featured' => false,
            'status' => 'active',
        ]);

        Package::create([
            'service_id' => $logo->id,
            'name_fa' => 'پکیج استاندارد',
            'name_en' => 'Standard Package',
            'description_fa' => 'هویت بصری حرفه‌ای.',
            'description_en' => 'Professional brand identity.',
            'price' => 120,
            'delivery_days' => 4,
            'revisions' => 4,
            'features_fa' => [
                'سه طرح لوگو',
                'PNG شفاف',
                'فایل AI',
                'فایل PDF',
            ],
            'features_en' => [
                'Three logo concepts',
                'Transparent PNG',
                'AI source file',
                'PDF export',
            ],
            'display_order' => 2,
            'is_featured' => true,
            'status' => 'active',
        ]);

        Package::create([
            'service_id' => $logo->id,
            'name_fa' => 'پکیج ویژه',
            'name_en' => 'Premium Package',
            'description_fa' => 'پکیج کامل هویت برند.',
            'description_en' => 'Complete corporate identity package.',
            'price' => 220,
            'delivery_days' => 6,
            'revisions' => 6,
            'features_fa' => [
                'لوگوی اختصاصی',
                'هویت سازمانی',
                'PNG شفاف',
                'AI',
                'EPS',
                'PDF',
                'راهنمای برند',
            ],
            'features_en' => [
                'Custom logo',
                'Corporate identity',
                'Transparent PNG',
                'AI source',
                'EPS source',
                'PDF',
                'Brand guideline',
            ],
            'display_order' => 3,
            'is_featured' => false,
            'status' => 'active',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Website Development
        |--------------------------------------------------------------------------
        */

        $website = Service::where('slug', 'website-development')->first();

        Package::create([
            'service_id' => $website->id,
            'name_fa' => 'پکیج پایه',
            'name_en' => 'Basic Package',
            'description_fa' => 'وب‌سایت ساده برای معرفی کسب‌وکار.',
            'description_en' => 'Simple website for business presentation.',
            'price' => 500,
            'delivery_days' => 7,
            'revisions' => 2,
            'features_fa' => [
                'حداکثر 5 صفحه',
                'طراحی واکنش‌گرا',
                'فرم تماس',
                'بهینه‌سازی پایه SEO',
            ],
            'features_en' => [
                'Up to 5 pages',
                'Responsive design',
                'Contact form',
                'Basic SEO optimization',
            ],
            'display_order' => 1,
            'is_featured' => false,
            'status' => 'active',
        ]);

        Package::create([
            'service_id' => $website->id,
            'name_fa' => 'پکیج استاندارد',
            'name_en' => 'Standard Package',
            'description_fa' => 'وب‌سایت حرفه‌ای برای شرکت‌ها.',
            'description_en' => 'Professional company website.',
            'price' => 1000,
            'delivery_days' => 14,
            'revisions' => 4,
            'features_fa' => [
                'حداکثر 10 صفحه',
                'طراحی واکنش‌گرا',
                'چندزبانه',
                'پنل مدیریت',
                'SEO پیشرفته',
                'فرم‌های سفارشی',
            ],
            'features_en' => [
                'Up to 10 pages',
                'Responsive design',
                'Multilingual support',
                'Admin dashboard',
                'Advanced SEO',
                'Custom forms',
            ],
            'display_order' => 2,
            'is_featured' => true,
            'status' => 'active',
        ]);

        Package::create([
            'service_id' => $website->id,
            'name_fa' => 'پکیج ویژه',
            'name_en' => 'Premium Package',
            'description_fa' => 'راهکار کامل توسعه وب.',
            'description_en' => 'Complete web development solution.',
            'price' => 2500,
            'delivery_days' => 30,
            'revisions' => 8,
            'features_fa' => [
                'صفحات نامحدود',
                'فروشگاه اینترنتی',
                'چندزبانه',
                'درگاه پرداخت',
                'SEO حرفه‌ای',
                'داشبورد مدیریت',
                'آموزش استفاده',
            ],
            'features_en' => [
                'Unlimited pages',
                'E-commerce store',
                'Multilingual support',
                'Payment gateway',
                'Professional SEO',
                'Admin dashboard',
                'Training session',
            ],
            'display_order' => 3,
            'is_featured' => false,
            'status' => 'active',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Motion Graphics
        |--------------------------------------------------------------------------
        */

        $motion = Service::where('slug', 'motion-graphics')->first();

        Package::create([
            'service_id' => $motion->id,
            'name_fa' => 'پکیج پایه',
            'name_en' => 'Basic Package',
            'description_fa' => 'انیمیشن کوتاه برای شبکه‌های اجتماعی.',
            'description_en' => 'Short animation for social media.',
            'price' => 120,
            'delivery_days' => 3,
            'revisions' => 2,
            'features_fa' => [
                'لوگوی متحرک',
                'تا 15 ثانیه',
                'کیفیت Full HD',
            ],
            'features_en' => [
                'Animated logo',
                'Up to 15 seconds',
                'Full HD quality',
            ],
            'display_order' => 1,
            'is_featured' => false,
            'status' => 'active',
        ]);

        Package::create([
            'service_id' => $motion->id,
            'name_fa' => 'پکیج استاندارد',
            'name_en' => 'Standard Package',
            'description_fa' => 'موشن گرافیک حرفه‌ای برای تبلیغات.',
            'description_en' => 'Professional motion graphics for marketing.',
            'price' => 250,
            'delivery_days' => 5,
            'revisions' => 3,
            'features_fa' => [
                'ویدیوی 30 ثانیه‌ای',
                'موشن گرافیک',
                'موسیقی پس‌زمینه',
                'خروجی Full HD',
            ],
            'features_en' => [
                '30-second animation',
                'Motion graphics',
                'Background music',
                'Full HD export',
            ],
            'display_order' => 2,
            'is_featured' => true,
            'status' => 'active',
        ]);

        Package::create([
            'service_id' => $motion->id,
            'name_fa' => 'پکیج ویژه',
            'name_en' => 'Premium Package',
            'description_fa' => 'موشن گرافیک کامل برای برندها.',
            'description_en' => 'Complete motion graphics solution.',
            'price' => 450,
            'delivery_days' => 7,
            'revisions' => 5,
            'features_fa' => [
                'ویدیوی 60 ثانیه‌ای',
                'لوگوی متحرک',
                'گویندگی',
                'موسیقی اختصاصی',
                'نسخه شبکه‌های اجتماعی',
                'کیفیت 4K',
            ],
            'features_en' => [
                '60-second animation',
                'Animated logo',
                'Professional voice-over',
                'Custom background music',
                'Social media versions',
                '4K export',
            ],
            'display_order' => 3,
            'is_featured' => false,
            'status' => 'active',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Printing Services
        |--------------------------------------------------------------------------
        */

        $printing = Service::where('slug', 'printing-services')->first();

        Package::create([
            'service_id' => $printing->id,
            'name_fa' => 'پکیج پایه',
            'name_en' => 'Basic Package',
            'description_fa' => 'خدمات چاپ مناسب برای کسب‌وکارهای کوچک.',
            'description_en' => 'Basic printing services for small businesses.',
            'price' => 30,
            'delivery_days' => 2,
            'revisions' => 1,
            'features_fa' => [
                'چاپ دیجیتال',
                'بنر',
                'استیکر',
                'کیفیت استاندارد',
            ],
            'features_en' => [
                'Digital printing',
                'Banner printing',
                'Stickers',
                'Standard quality',
            ],
            'display_order' => 1,
            'is_featured' => false,
            'status' => 'active',
        ]);

        Package::create([
            'service_id' => $printing->id,
            'name_fa' => 'پکیج استاندارد',
            'name_en' => 'Standard Package',
            'description_fa' => 'راهکار حرفه‌ای برای چاپ تبلیغاتی.',
            'description_en' => 'Professional printing package.',
            'price' => 80,
            'delivery_days' => 4,
            'revisions' => 2,
            'features_fa' => [
                'چاپ دیجیتال',
                'چاپ افست',
                'بنر فلکس',
                'استیکر',
                'کنترل کیفیت',
            ],
            'features_en' => [
                'Digital printing',
                'Offset printing',
                'Flex banners',
                'Stickers',
                'Quality inspection',
            ],
            'display_order' => 2,
            'is_featured' => true,
            'status' => 'active',
        ]);

        Package::create([
            'service_id' => $printing->id,
            'name_fa' => 'پکیج ویژه',
            'name_en' => 'Premium Package',
            'description_fa' => 'خدمات کامل چاپ و تبلیغات.',
            'description_en' => 'Complete commercial printing solution.',
            'price' => 180,
            'delivery_days' => 7,
            'revisions' => 3,
            'features_fa' => [
                'چاپ دیجیتال',
                'چاپ افست',
                'بنر فلکس',
                'تابلو تبلیغاتی',
                'استیکر',
                'بسته‌بندی حرفه‌ای',
            ],
            'features_en' => [
                'Digital printing',
                'Offset printing',
                'Flex banners',
                'Advertising signboards',
                'Stickers',
                'Professional packaging',
            ],
            'display_order' => 3,
            'is_featured' => false,
            'status' => 'active',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Digital Marketing
        |--------------------------------------------------------------------------
        */

        $marketing = Service::where('slug', 'digital-marketing')->first();

        Package::create([
            'service_id' => $marketing->id,
            'name_fa' => 'پکیج پایه',
            'name_en' => 'Basic Package',
            'description_fa' => 'شروع حضور حرفه‌ای در فضای دیجیتال.',
            'description_en' => 'Entry-level digital marketing package.',
            'price' => 200,
            'delivery_days' => 7,
            'revisions' => 2,
            'features_fa' => [
                'مدیریت فیسبوک',
                'مدیریت اینستاگرام',
                '10 پست در ماه',
                'گزارش ماهانه',
            ],
            'features_en' => [
                'Facebook management',
                'Instagram management',
                '10 social media posts',
                'Monthly report',
            ],
            'display_order' => 1,
            'is_featured' => false,
            'status' => 'active',
        ]);

        Package::create([
            'service_id' => $marketing->id,
            'name_fa' => 'پکیج استاندارد',
            'name_en' => 'Standard Package',
            'description_fa' => 'رشد حرفه‌ای برند در شبکه‌های اجتماعی.',
            'description_en' => 'Professional social media growth package.',
            'price' => 400,
            'delivery_days' => 15,
            'revisions' => 4,
            'features_fa' => [
                'مدیریت فیسبوک',
                'مدیریت اینستاگرام',
                '20 پست در ماه',
                'مدیریت کمپین',
                'گزارش تحلیلی',
            ],
            'features_en' => [
                'Facebook marketing',
                'Instagram marketing',
                '20 social media posts',
                'Campaign management',
                'Analytics report',
            ],
            'display_order' => 2,
            'is_featured' => true,
            'status' => 'active',
        ]);

        Package::create([
            'service_id' => $marketing->id,
            'name_fa' => 'پکیج ویژه',
            'name_en' => 'Premium Package',
            'description_fa' => 'راهکار کامل بازاریابی دیجیتال برای برندها.',
            'description_en' => 'Complete digital marketing solution.',
            'price' => 800,
            'delivery_days' => 30,
            'revisions' => 8,
            'features_fa' => [
                'مدیریت کامل شبکه‌های اجتماعی',
                'فیسبوک',
                'اینستاگرام',
                'برندسازی',
                'مدیریت کمپین',
                'طراحی محتوا',
                'گزارش عملکرد',
                'جلسات مشاوره',
            ],
            'features_en' => [
                'Complete social media management',
                'Facebook marketing',
                'Instagram marketing',
                'Branding strategy',
                'Campaign management',
                'Content creation',
                'Performance reports',
                'Consultation sessions',
            ],
            'display_order' => 3,
            'is_featured' => false,
            'status' => 'active',
        ]);
    }
}
