class ReferralMailer < ActionMailer::Base
    default from: "no-reply@dst.com"
  
    def invite_email(referral)
        @user = referral.user
        @url = "http://localhost:3000/registration"
        @user_name = @user.email.rpartition('@').first.capitalize
        @referral = referral
        mail(
            to: @referral.email, 
            subject: "#{@user_name} has referred you for our Application"
        )
    end
  end