class Api::V1::ReferralsController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: { referrals: current_user.referrals }, status: :ok
  end

  def create
    @referral = current_user.referrals.build(referral_params)
    if @referral.save
      ReferralMailer.invite_email(@referral).deliver
      render json: @referral, status: :created
    else
      render json: @referral.errors, status: :unprocessable_entity
    end
  end

  private

  def referral_params
    params.require(:referral).permit(:name, :email)
  end
end