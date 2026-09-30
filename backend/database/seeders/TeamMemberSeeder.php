<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $members = [

            [
                /*
                |--------------------------------------------------------------------------
                | Founder
                |--------------------------------------------------------------------------
                */

                'name_fa' => 'عبدالرحیم قیومی',
                'name_en' => 'Abdul Rahim Qayomi',

                'designation_fa' => 'مدیرعامل و مؤسس شرکت',
                'designation_en' => 'Chief Executive Officer (CEO) & Founder',

                'bio_fa' =>
                    'متخصص فناوری اطلاعات، طراح وب، طراح گرافیک، تدوین‌گر حرفه‌ای ویدیو و متخصص موشن گرافیک با بیش از ۸ سال تجربه در طراحی وب‌سایت، برندسازی، تولید محتوا، موشن گرافیک، تدوین ویدیو، انیمیشن لوگو و تحول دیجیتال.',

                'bio_en' =>
                    'Information Technology Specialist, Web Developer, Graphic Designer, Professional Video Editor and Motion Graphics Specialist with more than 8 years of experience in website development, branding, content production, motion graphics, logo animation and digital transformation.',

                'image' => null,

                'facebook' => null,
                'instagram' => null,
                'linkedin' => null,

                'display_order' => 1,

                'status' => 'active',
            ],

            [
                'name_fa' => 'احمد شایق قیومی',
                'name_en' => 'Ahmad Shayeq Qayomi',

                'designation_fa' => 'متخصص استراتژی محتوا و نویسنده سناریوهای تبلیغاتی',
                'designation_en' => 'Content Strategist & Advertising Script Writer',

                'bio_fa' =>
                    'مسئول تولید محتوای خلاقانه، نگارش متن‌های تبلیغاتی، طراحی کمپین‌های تبلیغاتی و تدوین سناریوهای حرفه‌ای.',

                'bio_en' =>
                    'Responsible for creative content development, advertising copywriting, commercial scripts and campaign planning.',

                'image' => null,

                'facebook' => null,
                'instagram' => null,
                'linkedin' => null,

                'display_order' => 2,

                'status' => 'active',
            ],

            [
                'name_fa' => 'سهیل کریمی',
                'name_en' => 'Sohail Karimi',

                'designation_fa' => 'تدوین‌گر ویدیو و طراح موشن گرافیک',
                'designation_en' => 'Video Editor & Motion Graphics Designer',

                'bio_fa' =>
                    'متخصص تدوین حرفه‌ای ویدیو، جلوه‌های ویژه، موشن گرافیک و تولید محتوای ویدیویی خلاقانه.',

                'bio_en' =>
                    'Specialized in professional video editing, motion graphics, visual effects and creative video production.',

                'image' => null,

                'facebook' => null,
                'instagram' => null,
                'linkedin' => null,

                'display_order' => 3,

                'status' => 'active',
            ],

            [
                'name_fa' => 'شمیم اکبری',
                'name_en' => 'Shamim Akbari',

                'designation_fa' => 'توسعه‌دهنده وب و برنامه‌نویس',
                'designation_en' => 'Web Developer & Software Programmer',

                'bio_fa' =>
                    'متخصص طراحی و توسعه وب‌سایت، برنامه‌نویسی و پیاده‌سازی راهکارهای نرم‌افزاری تحت وب.',

                'bio_en' =>
                    'Specialized in website development, software programming and web-based digital solutions.',

                'image' => null,

                'facebook' => null,
                'instagram' => null,
                'linkedin' => null,

                'display_order' => 4,

                'status' => 'active',
            ],

            [
                'name_fa' => 'فاطمه یاشار',
                'name_en' => 'Fatima Yashar',

                'designation_fa' => 'گوینده و نریتور بخش بانوان',
                'designation_en' => 'Female Voice-Over Artist',

                'bio_fa' =>
                    'متخصص گویندگی حرفه‌ای، اجرای نریشن تبلیغاتی و تولید محتوای صوتی برای پروژه‌های رسانه‌ای.',

                'bio_en' =>
                    'Professional female voice-over artist specializing in commercials, narration and multimedia audio production.',

                'image' => null,

                'facebook' => null,
                'instagram' => null,
                'linkedin' => null,

                'display_order' => 5,

                'status' => 'active',
            ],

            [
                'name_fa' => 'نصیر نوین',
                'name_en' => 'Nasir Naveen',

                'designation_fa' => 'گوینده و نریتور بخش آقایان',
                'designation_en' => 'Male Voice-Over Artist',

                'bio_fa' =>
                    'متخصص اجرای نریشن‌های تبلیغاتی، مستند و تولید محتوای صوتی حرفه‌ای.',

                'bio_en' =>
                    'Professional male voice-over artist specializing in advertising, documentaries and multimedia narration.',

                'image' => null,

                'facebook' => null,
                'instagram' => null,
                'linkedin' => null,

                'display_order' => 6,

                'status' => 'active',
            ],

        ];

        foreach ($members as $member) {

            TeamMember::create($member);

        }
    }
}
