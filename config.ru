require 'sinatra'
run Sinatra::Application
get '/' do
  send_file 'public/app/index.html'
end
