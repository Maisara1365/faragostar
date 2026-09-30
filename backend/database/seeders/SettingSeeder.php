<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Seed the company's main settings.
     */
    public function run(): void
    {
        Setting::create([

            /*
            |--------------------------------------------------------------------------
            | Company Identity
            |--------------------------------------------------------------------------
            */

            'company_name_fa' => 'شرکت تبلیغاتی فراگستر',

            'company_name_en' => 'Faragostar Advertising Company',

            'en_brand_name' => 'Faragostar',

            'fa_brand_name' => 'فراگستر',


            /*
            |--------------------------------------------------------------------------
            | Contact Information
            |--------------------------------------------------------------------------
            */

            'company_email' => 'info@faragostar.com',

            /*
            | Phone 1
            |
            | IMPORTANT:
            | Phone 1 is always the WhatsApp number.
            */

            'phone_1_fa' => '۰۷۹۷۳۷۳۶۹۰',

            'phone_1_en' => '0797373690',

            /*
            | Phone 2
            */

            'phone_2_fa' => '۰۷۱۱۶۶۷۵۱۱',

            'phone_2_en' => '0711667511',


            /*
            |--------------------------------------------------------------------------
            | Company Address
            |--------------------------------------------------------------------------
            */

            'company_address_fa' =>
                "شهر پلخمری، بندر قشقاق، مارکیت آریانا منزل اول\n" .
                "شهر پلخمری، شاداب مارکیت، منزل دوم",

            'company_address_en' =>
                "Pul-e-Khumri City, Bandar Qashqaq, Ariana Market, First Floor\n" .
                "Pul-e-Khumri City, Shadab Market, Second Floor",


            /*
            |--------------------------------------------------------------------------
            | Company Description
            |--------------------------------------------------------------------------
            */

            'about_company_fa' =>
                'شرکت تبلیغاتی فراگستر یک آژانس خلاق و نوآور است که در زمینه طراحی گرافیک، تولید ویدیو، توسعه وب، برندینگ و بازاریابی دیجیتال فعالیت می‌کند.',

            'about_company_en' =>
                'Faragostar Advertising Company is a creative and innovative agency specializing in graphic design, video production, web development, branding, and digital marketing.',


            /*
            |--------------------------------------------------------------------------
            | Branding
            |--------------------------------------------------------------------------
            */

            'logo' => 'images/company/logo.png',

            'favicon' => 'images/company/favicon.ico',


            /*
            |--------------------------------------------------------------------------
            | Theme Colors
            |--------------------------------------------------------------------------
            */

            'primary_color' => '#183B73',

            'secondary_color' => '#46A6D9',

            'dark_color' => '#2D2D2D',

            'light_color' => '#F8FAFC',

            'white_color' => '#FFFFFF',


            /*
            |--------------------------------------------------------------------------
            | Social Media
            |--------------------------------------------------------------------------
            */

            'facebook' => null,

            'instagram' => null,

            'linkedin' => null,

            'twitter' => null,

            'telegram' => null,


            /*
            |--------------------------------------------------------------------------
            | Website
            |--------------------------------------------------------------------------
            */

            'website' => null,

            'google_map' => null,


            /*
            |--------------------------------------------------------------------------
            | Working Hours
            |--------------------------------------------------------------------------
            */

            'working_hours_fa' =>
                'شنبه تا پنجشنبه: ۸:۰۰ صبح تا ۶:۰۰ عصر',

            'working_hours_en' =>
                'Saturday to Thursday: 8:00 AM to 6:00 PM',


            /*
            |--------------------------------------------------------------------------
            | SEO - Persian
            |--------------------------------------------------------------------------
            */

            'meta_title_fa' =>
                'شرکت تبلیغاتی فراگستر | خدمات تبلیغاتی و دیجیتال',

            'meta_description_fa' =>
                'شرکت تبلیغاتی فراگستر ارائه‌دهنده خدمات طراحی گرافیک، تولید ویدیو، توسعه وب، برندینگ و بازاریابی دیجیتال.',

            'meta_keywords_fa' =>
                'فراگستر، شرکت تبلیغاتی، طراحی گرافیک، طراحی وب، تولید ویدیو، بازاریابی دیجیتال',


            /*
            |--------------------------------------------------------------------------
            | SEO - English
            |--------------------------------------------------------------------------
            */

            'meta_title_en' =>
                'Faragostar Advertising Company | Advertising & Digital Services',

            'meta_description_en' =>
                'Faragostar Advertising Company provides graphic design, video production, web development, branding, and digital marketing services.',

            'meta_keywords_en' =>
                'Faragostar, advertising company, graphic design, web development, video production, digital marketing',


            /*
            |--------------------------------------------------------------------------
            | System
            |--------------------------------------------------------------------------
            */

            'default_language' => 'fa',


            /*
            |--------------------------------------------------------------------------
            | Copyright
            |--------------------------------------------------------------------------
            */

            'copyright_fa' =>
                '© {year} شرکت تبلیغاتی فراگستر. تمامی حقوق محفوظ است.',

            'copyright_en' =>
                '© {year} Faragostar Advertising Company. All rights reserved.',
        ]);
    }
}
