<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $items = [

            [
                'title_fa' => 'کمپین تبلیغاتی شرکت ساختمانی',
                'title_en' => 'Construction Company Campaign',

                'slug' => 'construction-company-campaign',

                'category_fa' => 'تبلیغات ویدئویی',
                'category_en' => 'Video Advertising',

                'description_fa' =>
                    'کمپین کامل تبلیغات ویدئویی برای معرفی پروژه‌های ساختمانی.',

                'description_en' =>
                    'Complete promotional video campaign for a construction company.',

                'client_name' => 'ABC Construction',

                'project_url' => null,

                'completion_date' => '2025-01-15',

                'theme_color' => '#183B73',

                'display_order' => 1,

                'is_featured' => true,

                'status' => 'active',
            ],

            [
                'title_fa' => 'طراحی هویت برند رستوران',
                'title_en' => 'Restaurant Branding',

                'slug' => 'restaurant-branding',

                'category_fa' => 'طراحی گرافیک',
                'category_en' => 'Graphic Design',

                'description_fa' =>
                    'طراحی لوگو، منو، بسته‌بندی و هویت بصری کامل.',

                'description_en' =>
                    'Complete branding including logo, menu and packaging.',

                'client_name' => 'Royal Restaurant',

                'project_url' => null,

                'completion_date' => '2025-02-10',

                'theme_color' => '#46A6D9',

                'display_order' => 2,

                'is_featured' => true,

                'status' => 'active',
            ],

            [
                'title_fa' => 'فروشگاه اینترنتی پوشاک',
                'title_en' => 'Fashion E-Commerce Website',

                'slug' => 'fashion-ecommerce-website',

                'category_fa' => 'طراحی وب',
                'category_en' => 'Website Development',

                'description_fa' =>
                    'طراحی و توسعه فروشگاه آنلاین با پنل مدیریت.',

                'description_en' =>
                    'Custom e-commerce website with admin dashboard.',

                'client_name' => 'Fashion House',

                'project_url' => null,

                'completion_date' => '2025-03-18',

                'theme_color' => '#10B981',

                'display_order' => 3,

                'is_featured' => true,

                'status' => 'active',
            ],

            [
                'title_fa' => 'انیمیشن معرفی محصول',
                'title_en' => 'Product Animation',

                'slug' => 'product-animation',

                'category_fa' => 'موشن گرافیک',
                'category_en' => 'Motion Graphics',

                'description_fa' =>
                    'ساخت انیمیشن تبلیغاتی برای معرفی محصول جدید.',

                'description_en' =>
                    'Animated promotional video for a new product.',

                'client_name' => 'Nova Tech',

                'project_url' => null,

                'completion_date' => '2025-04-20',

                'theme_color' => '#F59E0B',

                'display_order' => 4,

                'is_featured' => false,

                'status' => 'active',
            ],

            [
                'title_fa' => 'کمپین بازاریابی دیجیتال',
                'title_en' => 'Digital Marketing Campaign',

                'slug' => 'digital-marketing-campaign',

                'category_fa' => 'بازاریابی دیجیتال',
                'category_en' => 'Digital Marketing',

                'description_fa' =>
                    'مدیریت کامل کمپین‌های فیسبوک و اینستاگرام.',

                'description_en' =>
                    'Complete Facebook and Instagram marketing campaign.',

                'client_name' => 'Smart Electronics',

                'project_url' => null,

                'completion_date' => '2025-05-12',

                'theme_color' => '#8B5CF6',

                'display_order' => 5,

                'is_featured' => false,

                'status' => 'active',
            ],

        ];

        foreach ($items as $item) {

            Portfolio::create($item);

        }
    }
}
