from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns =[
    # > Registrarse
    path('signup', views.Signup, name="signup"), 
    # > Iniciar sesión          
    path('login/', auth_views.LoginView.as_view(next_page='index'), name='login'),  
    # > Cerrar sesión   
    path('logout/', auth_views.LogoutView.as_view(next_page='index'), name='logout'),   
    
    # > view 
      # Setting                 
    path('setting/', views.Setting_Index, name='Setting_Index'), 
      # Setting > information      
    path('user/information', views.User_ViewInformation, name='User_ViewInformation'),
      # Setting > profile          
    path('user/profile', views.User_ViewProfile, name='User_ViewProfile'),
      # Change password y functions
    path('user/changePassword/', views.User_ChangePassword.as_view(), name='User_ChangePassword'),
      # Update date profile 
    path('user/updateProfile', views.User_UpdateProfile, name='User_UpdateProfile'),                            
]


