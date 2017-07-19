require File.expand_path('../model_file',__FILE__)
require 'sinatra'
require 'logger'
require 'base64'
require 'omniauth-twitter'
require 'twitter'
require "rack/csrf"
require 'rack/protection'

class Controller < Sinatra::Base
  set :bind,'0.0.0.0'
  set :environment,:production
  set :port,5645
  enable :sessions

private
  logger = Logger.new(File.expand_path('../app.log',__FILE__))
  configure do
#    use Rack::Session::Cookie, :secret => ENV['SESSION_KEY'] 
    use Rack::Protection::HttpOrigin
    use Rack::Protection::RemoteToken
    use Rack::Protection::JsonCsrf
    use Rack::Protection::XSSHeader
    use Rack::Protection::FrameOptions
    use Rack::Protection::PathTraversal
    use Rack::Protection::SessionHijacking
    use Rack::Protection::IPSpoofing
    use Rack::Protection::RemoteReferrer
    use Rack::Protection::FormToken
#    use Rack::Protection::EscapedParams
  end
  helpers do
    include Rack::Utils
    alias_method :h,:escape_html
    
    def csrf_token
      Rack::Csrf.csrf_token(env)
    end
    def csrf_metatag
      Rack::Csrf.metatag(env)
    end

    def csrf_tag
      Rack::Csrf.csrf_tag(env)
    end
    def set_error(message)
      @res[:message] ||= Array.new
      @res[:result]  = 'faild'
      if message.is_a? Array
        @res[:message].concat message
      else
        @res[:message] << message
      end
    end
    def params_require(keys)
      ret = true
      keys.each do |k|
        unless params[k]
          set_error("paramater :#{k.to_s} is required")
          ret = false
        end
      end
      return ret
    end
    # define a current_user method, so we can be sure if an user is authenticated
    def current_user
      !session[:uid].nil?
    end
  end 
public
  get '/' do
    @f_assets = FaceAsset.all.order("created_at DESC")
    erb :index
  end
  post '/save_sessions' do
    puts params
=begin
    keys=[
      "ang",
      "sad",
      "pre",
      "cool",
      "cute",
      "funny",
      "edit1",
      "edit2"
    ]
    params_require(keys)
=end
    session[:face_palams]||=Hash.new
    session[:face_palams][:ang] = params["ang"]
    session[:face_palams][:sad] = params["sad"]
    session[:face_palams][:pre] = params["pre"]
    session[:face_palams][:cool] = params["cool"]
    session[:face_palams][:cute] = params["cute"]
    session[:face_palams][:funny] = params["funny"]
    session[:face_palams][:edit1] = params["edit1"]
    session[:face_palams][:edit2] = params["edit2"]
    session[:face_palams][:edit_set1] = params["edit_set1"]
    session[:face_palams][:edit_set2] = params["edit_set2"]
  end
  get '/sign_in_with_twitter' do
    redirect to ('/auth/twitter')
  end
  get '/auth/twitter/callback' do
    # probably you will need to create a user in the database too...
    session[:uid] = env['omniauth.auth']['uid']
    omniauth = env['omniauth.auth']
    user = UserData.new unless user = UserData.find_by(uid:session[:uid])
    user.uid = session[:uid]
    user.access_token = omniauth.credentials.token
    user.token_secret = omniauth.credentials.secret
    user.encrypt_password(omniauth.credentials.secret)
    puts user.save
    session[:access_token_hash] = user.access_token_hash
    # this is the main endpoint to your application
    redirect to('/')
  end

  get '/auth/failure' do
    # omniauth redirects to /auth/failure when it encounters a problem
    # so you can implement this as you please
  end

  configure do
    use OmniAuth::Builder do
      provider :twitter, ENV['CONSUMER_KEY'], ENV['CONSUMER_SECRET']
  end

  end
  get '/set' do
    erb :index_set
  end
  
  post '/tweet_update' do
    puts params
    puts session[:access_token]
    @resp = "faild"
    p user=UserData.find_by(uid:session[:uid])
      if(user.access_token_hash == session[:access_token_hash])
        client = Twitter::REST::Client.new do |config|
          config.consumer_key        = ENV['CONSUMER_KEY']
          config.consumer_secret     = ENV['CONSUMER_SECRET']
          config.access_token        = user.access_token
          config.access_token_secret = user.token_secret
        end
        str = params["text"]
        if(params["data"]=~/data:image\/png/)
          params["data"].slice!("data:image/png;base64,")
          params["data"].slice!("data:image/png,base64,")
          file_name = File.expand_path("../public/img/data/#{session[:uid]}.png",__FILE__)
          media = File.open(file_name,"w")
          media.write(Base64.decode64(params["data"]))
          media.close
          media = File.open(file_name)
          client.update_with_media(str, media)
          media.close
          @resp = "success"
        end
      end
    erb :tweet_clear
  end

  post '/asset' do
    @str="登録しました!"
    keys=[
      "i",
      "j",
      "y",
      "eye_h",
      "eye_v",
      "eye_i",
      "eye_j",
      "eye_vsize",
      "eye_width",
      "eye_size",
      "nose_y",
      "nose_len",
      "mouth_y",
      "mouth_width",
      "mouth_end_y",
      "mouth_t_i",
      "mouth_t_j",
      "mouth_b_i",
      "mouth_b_j",
      "eb_y",
      "eb_h",
      "eb_i",
      "eb_j",
      "eb_w",
      "eye_pup_width",
      "eye_line_width",
      "eye_pup_size",
      "eye_pup_o",
      "data"
    ]
    params_require(keys)
    if(params["data"]=~/data:image\/png/)
      ast = FaceAsset.create(
      name: params["name"],
      i: params["i"].to_f*1000000,
      j: params["j"].to_f*1000000,
      y: params["y"].to_f*1000000,
      eye_h: params["eye_h"].to_f*1000000,
      eye_v: params["eye_v"].to_f*1000000,
      eye_i: params["eye_i"].to_f*1000000,
      eye_j: params["eye_j"].to_f*1000000,
      eye_vsize: params["eye_vsize"].to_f*1000000,
      eye_width: params["eye_width"].to_f*1000000, 
      eye_size: params["eye_size"].to_f*1000000, 
      nose_y: params["nose_y"].to_f*1000000,
      nose_len: params["nose_len"].to_f*1000000, 
      mouth_y: params["mouth_y"].to_f*1000000,
      mouth_width: params["mouth_width"].to_f*1000000,
      mouth_end_y: params["mouth_end_y"].to_f*1000000,
      mouth_t_i: params["mouth_t_i"].to_f*1000000,
      mouth_t_j: params["mouth_t_j"].to_f*1000000,
      mouth_b_i: params["mouth_b_i"].to_f*1000000,
      mouth_b_j: params["mouth_b_j"].to_f*1000000,
      eb_y: params["eb_y"].to_f*1000000,
      eb_h: params["eb_h"].to_f*1000000,
      eb_i: params["eb_i"].to_f*1000000,
      eb_j: params["eb_j"].to_f*1000000,
      eb_w: params["eb_w"].to_f*1000000,
      eye_pup_width: params["eye_pup_width"].to_f*1000000,
      eye_line_width: params["eye_line_width"].to_f*1000000,
      eye_pup_size: params["eye_pup_size"].to_f*1000000,
      eye_pup_o: params["eye_pup_o"].to_f*1000000
      )
      keys.each do |key|
        puts "#{key} : #{params[key]}" unless key == "data"
      end
      pp ast
      if ast
        params["data"].slice!("data:image/png;base64,")
        params["data"].slice!("data:image/png,base64,")
        ast.upload_file(params["data"])
      else
        @str="登録に失敗しました"
      end
    else
      @str="登録に失敗しました"
    end
    return @str
  end
end
