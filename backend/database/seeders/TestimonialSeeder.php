<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonial;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        Testimonial::truncate();

        $testimonials = [
            [
                'name' => 'Ahmad Rahimi',
                'company_fa' => 'شرکت ساختمانی آرمان',
                'company_en' => 'Arman Construction',
                'position_fa' => 'مدیر عامل',
                'position_en' => 'Chief Executive Officer',
                'image' => null,
                'rating' => 5,
                'review_fa' => 'همکاری با فراگستر یکی از بهترین تصمیم‌های ما بود. کیفیت چاپ، طراحی و پشتیبانی تیم واقعاً فوق‌العاده است.',
                'review_en' => 'Working with Faragostar was one of the best decisions for our company. Their design quality, printing services and support exceeded our expectations.',
                'is_featured' => true,
                'display_order' => 1,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Fatima Noori',
                'company_fa' => 'فروشگاه آنلاین نور',
                'company_en' => 'Noor Online Store',
                'position_fa' => 'مدیر بازاریابی',
                'position_en' => 'Marketing Manager',
                'image' => null,
                'rating' => 5,
                'review_fa' => 'کمپین تبلیغاتی دیجیتال فراگستر باعث افزایش قابل توجه فروش ما شد. همکاری با این تیم را کاملاً پیشنهاد می‌کنم.',
                'review_en' => 'Faragostar\'s digital marketing campaign significantly increased our sales. I highly recommend working with this team.',
                'is_featured' => false,
                'display_order' => 2,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mohammad Hussain',
                'company_fa' => 'گروه تجاری افغان',
                'company_en' => 'Afghan Business Group',
                'position_fa' => 'مدیر فروش',
                'position_en' => 'Sales Director',
                'image' => null,
                'rating' => 5,
                'review_fa' => 'تیم فراگستر در تمام مراحل پروژه بسیار حرفه‌ای عمل کرد و نتیجه نهایی فراتر از انتظار ما بود.',
                'review_en' => 'The Faragostar team handled every stage professionally. The final result was beyond our expectations.',
                'is_featured' => false,
                'display_order' => 3,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Zahra Mohammadi',
                'company_fa' => 'شرکت فناوری آینده',
                'company_en' => 'Future Technology',
                'position_fa' => 'مدیر پروژه',
                'position_en' => 'Project Manager',
                'image' => null,
                'rating' => 5,
                'review_fa' => 'از طراحی برند تا چاپ محصولات تبلیغاتی، همه چیز با کیفیت بسیار بالا انجام شد.',
                'review_en' => 'From branding to promotional printing, everything was delivered with exceptional quality.',
                'is_featured' => false,
                'display_order' => 4,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ali Hamidi',
                'company_fa' => 'رستوران الماس',
                'company_en' => 'Diamond Restaurant',
                'position_fa' => 'مالک',
                'position_en' => 'Owner',
                'image' => null,
                'rating' => 5,
                'review_fa' => 'هم کیفیت خدمات و هم نحوه برخورد تیم فراگستر بسیار حرفه‌ای و رضایت‌بخش بود.',
                'review_en' => 'Both the service quality and the professionalism of the Faragostar team were outstanding.',
                'is_featured' => false,
                'display_order' => 5,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Testimonial::insert($testimonials);
    }
}
